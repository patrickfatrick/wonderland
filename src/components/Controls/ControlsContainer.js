import { connect } from 'react-redux';
import { setAudioOn, setAutoscroll, updateBufferedTime } from '../../store/ducks/audio-player';
import { setDarkmode } from '../../store/ducks/application';
import Controls from './Controls';

function mapStatetoProps({ audioPlayer, application, data }) {
  return {
    audioPlayerElement: audioPlayer.element,
    buffering: audioPlayer.buffering,
    darkmode: application.darkmode,
    audioOn: audioPlayer.audioOn,
    autoscroll: audioPlayer.autoscroll,
    audio: data.book.audio,
  };
}

/* eslint-disable no-param-reassign */
function setupPlayer(player, bool) {
  return (dispatch, getState) => {
    dispatch(setAudioOn(bool));
    if (bool && player.src) {
      if (!player.seekable.length) player.load(); // some browsers cannot seek until the audio loads
      player.currentTime = getState().audioPlayer.timestamp;
      player.play();
      dispatch(updateBufferedTime(player));
    } else {
      player.pause();
    }
  };
}
/* eslint-enable no-param-reassign */

function mapDispatchToProps(dispatch) {
  return {
    toggleAudio(player, bool) {
      dispatch(setupPlayer(player, bool));
    },
    toggleAutoscroll(bool) {
      dispatch(setAutoscroll(bool));
    },
    toggleDarkmode(bool) {
      window.localStorage.setItem('darkmode', bool);
      dispatch(setDarkmode(bool));
    },
  };
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps,
)(Controls);
