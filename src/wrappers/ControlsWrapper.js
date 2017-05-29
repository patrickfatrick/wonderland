/* globals window */

import { connect } from 'react-redux';
import { setAudioOn, setAutoscroll, updateBufferedTime } from '../store/ducks/audio-player';
import { setDarkmode } from '../store/ducks/data';
import Controls from '../components/Controls';

function mapStatetoProps(state) {
  return {
    audioPlayerElement: state.audioPlayer.element,
    buffering: state.audioPlayer.buffering,
    darkmode: state.data.darkmode,
    captions: state.captions,
    audioOn: state.audioPlayer.audioOn,
    autoscroll: state.audioPlayer.autoscroll,
    audio: state.data.book.audio,
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
