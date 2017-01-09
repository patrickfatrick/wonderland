/* globals window */

import { connect } from 'react-redux';
import { setTimestamp, setActiveLine, setAudioPlayer, setBook, setChapters, setLines, setBookLocation, setAssetsLocation, setActiveChapter, renderContainers, updateBuffering, incrementRenderIndex } from '../store/actions';
import getBook from '../services/book-service';
import Book from '../components/Book';

function mapStateToProps(state) {
  return {
    audioOn: state.audioPlayer.audioOn,
    autoscroll: state.audioPlayer.autoscroll,
    book: state.data.book,
    bookViewerElement: state.audioPlayer.bookViewerElement,
    assetsLocation: state.data.assetsLocation,
    chapters: state.chapters,
    imagesLocation: `${state.data.assetsLocation}images/`,
    info: state.data.book.info,
    frontmatter: state.data.book.frontmatter,
    player: state.audioPlayer.element,
    timestamp: state.audioPlayer.timestamp,
  };
}

function mapDispatchToProps(dispatch) {
  // First increment the renderIndex by one, which allows us to render more containers
  function updateRenderIndexAndRender() {
    return (dispatch, getState) => { // eslint-disable-line no-shadow
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
        dispatch(updateRenderIndexAndRender());
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
      dispatch(updateBuffering(e.target));
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
)(Book);
