import { connect } from 'react-redux';
import { setTimestamp } from '../store/actions';
import Line from '../components/Line';

function mapStateToProps(state) {
  return {
    audioOn: state.audioPlayer.audioOn,
    timestamp: state.audioPlayer.timestamp,
    audioPlayerElement: state.audioPlayer.element,
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
