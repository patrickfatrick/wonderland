import { connect } from "react-redux";
import { incrementRenderIndex } from "../../store/ducks/application";
import { renderBlocks } from "../../store/ducks/rendered-blocks";
import { setTimestamp } from "../../store/ducks/audio-player";
import ChapterButton from "./ChapterButton";

function mapStatetoProps({ application }) {
  return {
    readerContainerElement: application.readerContainerElement,
    darkmode: application.darkmode,
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
  mapStatetoProps,
  mapDispatchToProps,
)(ChapterButton);
