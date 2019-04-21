import { connect } from "react-redux";
import { setBook } from "../../store/ducks/book";
import {
  setActiveChapter,
  setAssetsLocation,
  incrementRenderIndex,
  setReaderContainerEl,
} from "../../store/ducks/application";
import { setChapters } from "../../store/ducks/chapters";
import { setLines } from "../../store/ducks/lines";
import { setBlocks } from "../../store/ducks/blocks";
import getBook from "../../services/book-service";
import isSmallScreen from "../../utils/isSmallScreen";
import Reader from "./Reader";

function mapStateToProps(state) {
  const { audioPlayer, application, book } = state;
  return {
    book,
    audioOn: application.audioOn,
    darkmode: application.darkmode,
    player: audioPlayer.element,
    timestamp: audioPlayer.timestamp,
    renderIndex: application.renderIndex,
  };
}

// First increment the renderIndex by one, which allows us to render more blocks
function updateRenderIndexAndRender() {
  return (dispatch, getState) => {
    const { book, application } = getState();
    if (application.renderIndex >= book.chapters.length - 1) return;
    dispatch(incrementRenderIndex());
  };
}

// Uses book-service to retrieve the book data from the server,
// normalize it, and then dispatch the data-setting actions
function getBookAsync(bookId) {
  return (dispatch) => {
    getBook(bookId)
      .then((response) => {
        dispatch(setBook(response.book[bookId]));
        dispatch(setChapters(response.chapters));
        dispatch(setBlocks(response.blocks));
        dispatch(setLines(response.lines));
      });
  };
}

function dispatchSetActiveChapter(scrollPos) {
  return (dispatch, getState) => {
    const state = getState();
    const { book: { chapters: chapterOrder }, chapters } = state;
    const next = [...chapterOrder].reverse().find(chapterId => (
      scrollPos >= chapters[chapterId]?.el?.offsetTop - (isSmallScreen() ? 75 : 30)
    ));
    dispatch(setActiveChapter(next));
  };
}

function mapDispatchToProps(dispatch) {
  return {
    mountBookAndAssets(bookId) {
      dispatch(getBookAsync(bookId));
      dispatch(setAssetsLocation(`data/${bookId}/assets`));
    },
    setActiveChapter(scrollPos) {
      dispatch(dispatchSetActiveChapter(scrollPos));
    },
    renderMore() {
      dispatch(updateRenderIndexAndRender());
    },
    refReaderContainer(el) {
      dispatch(setReaderContainerEl(el));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Reader);
