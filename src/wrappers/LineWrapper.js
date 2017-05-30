import { connect } from 'react-redux';
import Line from '../components/Line';

function mapStateToProps(state, ownProps) {
  return {
    audioOn: state.audioPlayer.audioOn,
    darkmode: state.application.darkmode,
    timestamp: state.audioPlayer.timestamp,
    audioPlayerElement: state.audioPlayer.element,
    line: state.lines[ownProps.lineId],
  };
}

export default connect(
  mapStateToProps,
)(Line);
