import { connect } from "react-redux";
import { setAudioPlayerEl } from "../../store/ducks/application";
import { setTimestamp, updateBufferedTime } from "../../store/ducks/audio-player";
import { setActiveLine } from "../../store/ducks/lines";
import Audio from "./Audio";

function mapStateToProps({ data, application }) {
  return {
    audioLocation: `${application.assetsLocation}/audio/${data.book.audio.src}`,
    autoscrollOn: application.autoscrollOn,
    readerContainerElement: application.readerContainerElement,
  };
}

function dispatchSetActiveLine(currentTime) {
  return (dispatch, getState) => {
    const { lines } = getState();
    // First finds the current active line, then what it should be based on the timestamp
    const lineIds = Object.keys(lines);
    const prev = lineIds.find(lineId => lines[lineId].active);
    const next = lineIds.find((lineId) => {
      const line = lines[lineId];
      return currentTime >= line.timestampStart && currentTime < line.timestampEnd;
    });
    dispatch(setActiveLine(prev, next));
  };
}

function mapDispatchToProps(dispatch) {
  return {
    timeUpdate(e) {
      dispatch(setTimestamp(e.target.currentTime));
      dispatch(dispatchSetActiveLine(e.target.currentTime));
      dispatch(updateBufferedTime(e.target));
    },
    refPlayer(node) {
      dispatch(setAudioPlayerEl(node));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Audio);
