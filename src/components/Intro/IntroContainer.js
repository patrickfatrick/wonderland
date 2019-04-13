import { connect } from "react-redux";
import { incrementRenderIndex } from "../../store/ducks/application";
import { renderBlocks } from "../../store/ducks/rendered-blocks";
import { setTimestamp } from "../../store/ducks/audio-player";
import selectChapter from "../../store/selectors/chapterSelector";
import selectLine from "../../store/selectors/lineSelector";
import Intro from "./Intro";

function mapStateToProps(state) {
  const { application, data } = state;
  return {
    darkmode: application.darkmode,
    book: data.book,
    chapter: selectChapter(state, application.activeChapter),
    line: selectLine(state, application.activeLine),
    readerContainerElement: application.readerContainerElement,
    audioPlayerElement: application.audioPlayerElement,
  };
}

function updateRenderIndexAndRender(index) {
  return (dispatch, getState) => {
    const diff = index - getState().application.renderIndex;
    dispatch(incrementRenderIndex(diff));
    const { data, application: { renderIndex } } = getState();
    dispatch(renderBlocks(data, renderIndex, diff));
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
