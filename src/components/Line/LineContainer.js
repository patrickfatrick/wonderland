import { connect } from 'react-redux';
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

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Line);
