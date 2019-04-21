import { connect } from "react-redux";
import { setTimestamp } from "../../store/ducks/audio-player";
import selectLine from "../../store/selectors/lineSelector";
import Line from "./Line";

function mapStateToProps(state, ownProps) {
  const { audioPlayer, application } = state;
  return {
    audioOn: application.audioOn,
    darkmode: application.darkmode,
    timestamp: audioPlayer.timestamp,
    audioPlayerElement: application.audioPlayerElement,
    line: selectLine(state, ownProps.lineId),
    activeLineId: application.activeLine,
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
