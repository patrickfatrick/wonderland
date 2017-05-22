/* globals window */

import { connect } from 'react-redux';
import { setBook, setBookLocation, setAssetsLocation, incrementRenderIndex } from '../store/ducks/data';
import { setTimestamp, setAudioPlayer, updateBufferedTime } from '../store/ducks/audio-player';
import { setChapters, setActiveChapter } from '../store/ducks/chapters';
import { setActiveLine, setLines } from '../store/ducks/lines';
import { renderContainers } from '../store/ducks/rendered-containers';
import getBook from '../services/book-service';
import Reader from '../components/Reader';

function mapStateToProps(state) {
  return {
    audioOn: state.audioPlayer.audioOn,
    autoscroll: state.audioPlayer.autoscroll,
    book: state.data.book,
    bookViewerElement: state.audioPlayer.bookViewerElement,
    assetsLocation: state.data.assetsLocation,
    imagesLocation: `${state.data.assetsLocation}images/`,
    info: state.data.book.info,
    frontmatter: state.data.book.frontmatter,
    backmatter: state.data.book.backmatter,
    player: state.audioPlayer.element,
    timestamp: state.audioPlayer.timestamp,
    renderIndex: state.data.renderIndex,
  };
}

function mapDispatchToProps(dispatch) {
  // First increment the renderIndex by one, which allows us to render more containers
  function updateRenderIndexAndRender() {
    return (dispatch, getState) => { // eslint-disable-line no-shadow
      if (getState().data.renderIndex >= getState().data.book.chapters.length - 1) return;
      dispatch(incrementRenderIndex());
      dispatch(renderContainers(getState().data));
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
        // dispatch(updateRenderIndexAndRender());
      });
    };
  }

  function updateTimes(e) {
    return () => {
      dispatch(setTimestamp(e.target.currentTime));
      dispatch(setActiveLine(e.target.currentTime));
    };
  }

  function autoscrollHandler(viewer) {
    if (viewer.querySelector('.active')) window.scroll(0, viewer.querySelector('.active').offsetTop - 200);
  }

  return {
    timeUpdate(e, viewer, autoscroll) {
      dispatch(updateTimes(e));
      dispatch(updateBufferedTime(e.target));
      if (autoscroll) autoscrollHandler(viewer);
    },
    seek(player, seconds) {
      player.currentTime = seconds; // eslint-disable-line no-param-reassign
    },
    refPlayer(node) {
      dispatch(setAudioPlayer(node));
    },
    mountBookAndAssets(path) {
      dispatch(getBookAsync(`${path}data.json`));
      dispatch(setBookLocation(`${path}data.json`));
      dispatch(setAssetsLocation(`${path}assets/`));
    },
    scrollHandler({ scrollPos, offset }) {
      if (scrollPos >= offset - 200) dispatch(updateRenderIndexAndRender());
      dispatch(setActiveChapter(scrollPos));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Reader);
