import { connect } from 'react-redux'
import { setTimestamp } from '../store/actions'
import Line from '../components/Line.jsx'

function mapStateToProps (state) {
  return {
    audioOn: state.audioPlayer.audioOn,
    timestamp: state.audioPlayer.timestamp,
    player: state.audioPlayer.element
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    lineHandler (player, seconds) {
      dispatch(setTimestamp(seconds))
      ownProps.seek(player, seconds)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Line)
