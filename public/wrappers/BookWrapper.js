/* globals window */

import { connect } from 'react-redux';
import { setTimestamp, setActiveLine, setAudioPlayer, setBook, setChapters, setBookLocation, setAssetsLocation, setActiveChapter, renderContainers, updateBuffering } from '../store/actions';
import getBook from '../services/book-service';
import Book from '../components/Book';

function mapStateToProps(state) {
  return {
    audioOn: state.audioPlayer.audioOn,
    autoscroll: state.audioPlayer.autoscroll,
    book: state.book,
    bookViewerElement: state.audioPlayer.bookViewerElement,
    chapters: state.chapters,
    info: state.book.info,
    player: state.audioPlayer.element,
    timestamp: state.audioPlayer.timestamp,
  };
}

function mapDispatchToProps(dispatch) {
  function getBookAsync(location) {
    return () => {
      getBook(location)
      .then((response) => {
        dispatch(setBook(response));
        // dispatch(setChapters(response.chapters));
        // dispatch(renderContainers(response));
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
    scrollHandler({ book, scrollPos, offset }) {
      if (scrollPos >= offset - 200) dispatch(renderContainers(book));
      dispatch(setActiveChapter(scrollPos));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Book);
