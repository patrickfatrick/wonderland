import { connect } from 'react-redux';
import { setTimestamp } from '../store/actions';
import Line from '../components/Line';

function mapStateToProps(state, ownProps) {
  return {
    audioOn: state.audioPlayer.audioOn,
    timestamp: state.audioPlayer.timestamp,
    audioPlayerElement: state.audioPlayer.element,
    line: state.lines[ownProps.lineId],
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    lineHandler(player, seconds) {
      dispatch(setTimestamp(seconds));
      ownProps.seek(player, seconds);
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Line);
