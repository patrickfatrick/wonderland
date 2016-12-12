import { connect } from 'react-redux'
import { setAudioOn, setAudioSrc, setAutoscroll } from '../store/actions'
import { getMedia } from '../services/book-service'
import Buttons from '../components/Buttons.jsx'

function mapStatetoProps (state) {
  return {
    player: state.audioPlayer.element,
    captions: state.captions,
    audioOn: state.audioPlayer.audioOn,
    autoscroll: state.audioPlayer.autoscroll,
    audioLocation: state.book.assetsLocation + 'audio/' + state.book.audioSource
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  function getAudioAsync (location) {
    return (dispatch) => {
      getMedia(location, (blob) => {
        dispatch(setAudioSrc(blob))
      })
    }
  }
  return {
    toggleAudio (player, location, bool) {
      dispatch(setAudioOn(bool))
      if (bool && !player.src) dispatch(getAudioAsync(location))
      else if (bool && player.src) player.play()
      else player.pause()
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
