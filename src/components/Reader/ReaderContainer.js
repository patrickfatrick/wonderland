import { connect } from 'react-redux';
import { setBook } from '../../store/ducks/data';
import { setAssetsLocation, incrementRenderIndex } from '../../store/ducks/application';
import { setChapters, setActiveChapter } from '../../store/ducks/chapters';
import { setLines } from '../../store/ducks/lines';
import { renderBlocks } from '../../store/ducks/rendered-blocks';
import getBook from '../../services/book-service';
import Reader from './Reader';

function mapStateToProps({ audioPlayer, application, data }) {
  return {
    audioOn: audioPlayer.audioOn,
    book: data.book,
    darkmode: application.darkmode,
    player: audioPlayer.element,
    timestamp: audioPlayer.timestamp,
    renderIndex: application.renderIndex,
  };
}

function mapDispatchToProps(dispatch) {
  // First increment the renderIndex by one, which allows us to render more blocks
  function updateRenderIndexAndRender() {
    return (dispatch, getState) => { // eslint-disable-line no-shadow
      const { data } = getState();
      if (getState().application.renderIndex >= data.book.chapters.length - 1) return;
      dispatch(incrementRenderIndex());
      dispatch(renderBlocks(data, getState().application.renderIndex));
    };
  }

  // Uses book-service to retrieve the book data from the server,
  // normalize it, and then dispatch the data-setting actions
  function getBookAsync(location) {
    return () => {
      getBook(location)
        .then((response) => {
          dispatch(setBook(response));
          dispatch(setChapters(response.chapters));
          dispatch(setLines(response.lines));
        });
    };
  }

  return {
    mountBookAndAssets(path) {
      dispatch(getBookAsync(`${path}data.json`));
      dispatch(setAssetsLocation(`${path}assets/`));
    },
    scrollHandler(scrollPos, offset) {
      if (scrollPos >= offset - 200) dispatch(updateRenderIndexAndRender());
      dispatch(setActiveChapter(scrollPos));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Reader);
