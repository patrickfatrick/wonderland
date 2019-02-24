import { connect } from 'react-redux';
import { setBook } from '../../store/ducks/data';
import { setAssetsLocation, incrementRenderIndex } from '../../store/ducks/application';
import { setChapters, setActiveChapter } from '../../store/ducks/chapters';
import { setLines } from '../../store/ducks/lines';
import { renderBlocks } from '../../store/ducks/rendered-blocks';
import getBook from '../../services/book-service';
import isSmallScreen from '../../utils/isSmallScreen';
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

// First increment the renderIndex by one, which allows us to render more blocks
function updateRenderIndexAndRender() {
  return (dispatch, getState) => {
    const { data } = getState();
    if (getState().application.renderIndex >= data.book.chapters.length - 1) return;
    dispatch(incrementRenderIndex());
    dispatch(renderBlocks(data, getState().application.renderIndex));
  };
}

// Uses book-service to retrieve the book data from the server,
// normalize it, and then dispatch the data-setting actions
function getBookAsync(location) {
  return (dispatch) => {
    getBook(location)
      .then((response) => {
        dispatch(setBook(response));
        dispatch(setChapters(response.chapters));
        dispatch(setLines(response.lines));
      });
  };
}

function dispatchSetActiveChapter(scrollPos) {
  return (dispatch, getState) => {
    const state = getState();
    const { chapters: chapterOrder } = state.data.book;
    const { chapters } = state;
    const prev = chapterOrder.find(chapterId => chapters[chapterId].active);
    const next = [...chapterOrder].reverse().find(chapterId => (
      scrollPos >= chapters[chapterId]?.el?.offsetTop - (isSmallScreen() ? 75 : 30)
    ));
    dispatch(setActiveChapter(prev, next));
  };
}

function mapDispatchToProps(dispatch) {
  return {
    mountBookAndAssets(path) {
      dispatch(getBookAsync(`${path}data.json`));
      dispatch(setAssetsLocation(`${path}assets/`));
    },
    setActiveChapter(scrollPos) {
      dispatch(dispatchSetActiveChapter(scrollPos));
    },
    renderMore() {
      dispatch(updateRenderIndexAndRender());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Reader);
