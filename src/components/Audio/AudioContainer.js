import { connect } from 'react-redux';
import { setTimestamp, setAudioPlayer, updateBufferedTime } from '../../store/ducks/audio-player';
import { setActiveLine } from '../../store/ducks/lines';
import Audio from './Audio';

function mapStateToProps({ data, application, audioPlayer }) {
  return {
    audioLocation: `${application.assetsLocation}audio/${data.book.audio.src}`,
    autoscroll: audioPlayer.autoscroll,
    bookViewerElement: audioPlayer.bookViewerElement,
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
      dispatch(setAudioPlayer(node));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Audio);
