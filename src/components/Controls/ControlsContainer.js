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

function mapDispatchToProps(dispatch) {
  return {
    toggleAudio(e, player, bool) {
      e.currentTarget.blur();
      dispatch(setAudioOn(bool));
      if (bool && player.src) {
        player.play();
        dispatch(updateBufferedTime(player));
      } else {
        player.pause();
      }
    },
    toggleAutoscroll(e, bool) {
      e.currentTarget.blur();
      dispatch(setAutoscroll(bool));
    },
    toggleDarkmode(e, bool) {
      e.currentTarget.blur();
      window.localStorage.setItem('darkmode', bool);
      dispatch(setDarkmode(bool));
    },
  };
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps,
)(Controls);
