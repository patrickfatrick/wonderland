/* globals window */

import { connect } from 'react-redux';
import Line from '../components/Line';

function mapStateToProps(state, ownProps) {
  return {
    audioOn: state.audioPlayer.audioOn,
    darkmode: state.data.darkmode,
    timestamp: state.audioPlayer.timestamp,
    audioPlayerElement: state.audioPlayer.element,
    line: state.lines[ownProps.lineId],
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    lineHandler(e, player, seconds) {
      const target = e.currentTarget;
      ownProps.seek(player, seconds);
      window.setTimeout(() => target.blur(), 100);
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Line);
