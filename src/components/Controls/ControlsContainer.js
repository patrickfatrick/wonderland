import { connect } from 'react-redux';
import { updateBufferedTime } from '../../store/ducks/audio-player';
import { setAudioOn, setAutoscrollOn, setDarkmode } from '../../store/ducks/application';
import prettyDurationSelector from '../../store/selectors/prettyDurationSelector';
import prettySizeSelector from '../../store/selectors/prettySizeSelector';
import Controls from './Controls';

function mapStatetoProps(state) {
  const { audioPlayer, application, book } = state;
  return {
    readerContainerElement: application.readerContainerElement,
    audioPlayerElement: application.audioPlayerElement,
    buffering: audioPlayer.buffering,
    darkmode: application.darkmode,
    audioOn: application.audioOn,
    autoscrollOn: application.autoscrollOn,
    audio: book.audio,
    prettyDuration: prettyDurationSelector(state),
    prettySize: prettySizeSelector(state),
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
      dispatch(setAutoscrollOn(bool));
    },
    toggleDarkmode(bool) {
      dispatch(setDarkmode(bool));
    },
  };
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps,
)(Controls);
