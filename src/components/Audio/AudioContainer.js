import { connect } from 'react-redux';
import { setAudioPlayerEl, setActiveLine } from '../../store/ducks/application';
import { setTimestamp, updateBufferedTime } from '../../store/ducks/audio-player';
import isBetween from '../../utils/isBetween';
import Audio from './Audio';

function mapStateToProps(state) {
  const { book, application } = state;
  return {
    audioLocation: `${application.assetsLocation}/audio/${book.audio.src}`,
    autoscrollOn: application.autoscrollOn,
    readerContainerElement: application.readerContainerElement,
  };
}

function dispatchSetActiveLine(currentTime) {
  return (dispatch, getState) => {
    const { lines } = getState();
    // First finds the current active line, then what it should be based on the timestamp
    const lineIds = Object.keys(lines);
    const next = lineIds.find((lineId) => {
      const line = lines[lineId];
      return isBetween(currentTime, line.timestamp[0], line.timestamp[1]);
    });

    dispatch(setActiveLine(next));
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
