import { connect } from 'react-redux';
import { setTimestamp } from '../../store/ducks/audio-player';
import Line from './Line';

function mapStateToProps({ audioPlayer, application, lines }, ownProps) {
  return {
    audioOn: audioPlayer.audioOn,
    darkmode: application.darkmode,
    timestamp: audioPlayer.timestamp,
    audioPlayerElement: audioPlayer.element,
    line: lines[ownProps.lineId],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateAudioTimestamp(timestamp) {
      dispatch(setTimestamp(timestamp));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Line);
