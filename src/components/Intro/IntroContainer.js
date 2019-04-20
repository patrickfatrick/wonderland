import { connect } from "react-redux";
import { incrementRenderIndex } from "../../store/ducks/application";
import { setTimestamp } from "../../store/ducks/audio-player";
import selectChapter from "../../store/selectors/chapterSelector";
import selectLine from "../../store/selectors/lineSelector";
import Intro from "./Intro";

function mapStateToProps(state) {
  const { application, book } = state;
  return {
    book,
    darkmode: application.darkmode,
    activeChapter: selectChapter(state, application.activeChapter),
    activeLine: selectLine(state, application.activeLine),
    readerContainerElement: application.readerContainerElement,
    audioPlayerElement: application.audioPlayerElement,
  };
}

function updateRenderIndexAndRender(index) {
  return (dispatch, getState) => {
    const diff = index - getState().application.renderIndex;
    dispatch(incrementRenderIndex(diff));
  };
}

function mapDispatchToProps(dispatch) {
  return {
    renderMore(index) {
      dispatch(updateRenderIndexAndRender(index));
    },
    updateAudioTimestamp(timestamp) {
      dispatch(setTimestamp(timestamp));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Intro);
