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

function mapDispatchToProps(dispatch) {
  function updateTimes(e) {
    return () => {
      dispatch(setTimestamp(e.target.currentTime));
      dispatch(setActiveLine(e.target.currentTime));
    };
  }

  return {
    timeUpdate(e) {
      dispatch(updateTimes(e));
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
