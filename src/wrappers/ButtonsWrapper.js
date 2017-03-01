import { connect } from 'react-redux';
import { setAudioOn, setAutoscroll, updateBuffering } from '../store/ducks/audio-player';
import Buttons from '../components/Buttons';

function mapStatetoProps(state) {
  return {
    audioPlayerElement: state.audioPlayer.element,
    buffering: state.audioPlayer.buffering,
    captions: state.captions,
    audioOn: state.audioPlayer.audioOn,
    autoscroll: state.audioPlayer.autoscroll,
    audioSrc: `${state.data.assetsLocation}audio/${state.data.book.audioSrc}`,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleAudio(player, bool) {
      dispatch(setAudioOn(bool));
      if (bool && player.src) {
        player.play();
        dispatch(updateBuffering(player));
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
)(Buttons);
