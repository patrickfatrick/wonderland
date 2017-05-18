import { connect } from 'react-redux';
import { setAudioOn, setAutoscroll, updateBufferedTime } from '../store/ducks/audio-player';
import Controls from '../components/Controls';

function mapStatetoProps(state) {
  return {
    audioPlayerElement: state.audioPlayer.element,
    buffering: state.audioPlayer.buffering,
    captions: state.captions,
    audioOn: state.audioPlayer.audioOn,
    autoscroll: state.audioPlayer.autoscroll,
    audio: state.data.book.audio,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleAudio(player, bool) {
      dispatch(setAudioOn(bool));
      if (bool && player.src) {
        player.play();
        dispatch(updateBufferedTime(player));
      } else {
        player.pause();
      }
    },
    toggleAutoscroll(bool) {
      dispatch(setAutoscroll(bool));
    },
  };
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps,
)(Controls);
