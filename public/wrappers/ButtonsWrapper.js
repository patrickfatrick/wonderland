import { connect } from 'react-redux'
import { setAudioOn, setAutoscroll, setAudioSrc } from '../store/actions'
import { getMedia } from '../services/book-service'
import Buttons from '../components/Buttons.jsx'

function mapStatetoProps (state) {
  return {
    audioPlayer: state.audioPlayer,
    player: state.audioPlayer.element,
    captions: state.captions,
    audioOn: state.audioPlayer.audioOn,
    autoscroll: state.audioPlayer.autoscroll,
    audioLocation: state.book.assetsLocation + 'audio/' + state.book.audioSource
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  function getAudioAsync (location, player) {
    return (dispatch) => {
      getMedia(location, (blob) => {
        dispatch(setAudioSrc(blob))
        player.play()
      })
    }
  }
  return {
    toggleAudio (player, location, bool) {
      dispatch(setAudioOn(bool))
      if (bool && !player.src) return dispatch(getAudioAsync(location, player))
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
