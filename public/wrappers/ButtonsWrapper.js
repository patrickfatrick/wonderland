import { connect } from 'react-redux'
import { setAudioOn, setAutoscroll } from '../store/actions'
import Buttons from '../components/Buttons.jsx'

function mapStatetoProps (state) {
  return {
    audioPlayer: state.audioPlayer,
    captions: state.captions,
    audioOn: state.audioPlayer.audioOn,
    autoscroll: state.audioPlayer.autoscroll,
    audioLocation: state.book.assetsLocation + 'audio/' + state.book.audioSource
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    toggleAudio (player, bool) {
      dispatch(setAudioOn(bool))
      if (bool && player.src) return player.play()
      player.pause()
    },
    toggleAutoscroll (bool) {
      dispatch(setAutoscroll(bool))
    }
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(Buttons)
