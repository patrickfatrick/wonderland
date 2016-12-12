import { connect } from 'react-redux'
import { setTimestamp, setActiveLine, setAudioPlayer, setBook, setChapters, setContainers, setBookLocation, setAssetsLocation, setActiveChapter, setAudioSrc } from '../store/actions'
import { getBook, getMedia } from '../services/book-service'
import Book from '../components/Book.jsx'

function mapStateToProps (state) {
  return {
    audioOn: state.audioPlayer.audioOn,
    audioSrc: state.audioPlayer.audioSrc,
    autoscroll: state.audioPlayer.autoscroll,
    chapters: state.chapters,
    timestamp: state.audioPlayer.timestamp,
    player: state.audioPlayer.element,
    bookViewer: state.audioPlayer.bookViewer,
    book: state.book
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

  function getBookAsync (location) {
    return (dispatch, getState) => {
      getBook(location, (response) => {
        dispatch(setBook(response))
        dispatch(setChapters(response.chapters))
        dispatch(setContainers(response))
        dispatch(getAudioAsync(getState().book.assetsLocation + 'audio/' + response.audioSource))
      })
    }
  }

  function updateTimes (e) {
    return (dispatch) => {
      dispatch(setTimestamp(e.target.currentTime))
      dispatch(setActiveLine(e.target.currentTime))
    }
  }

  function autoscrollHandler (viewer) {
    window.scroll(0, viewer.querySelector('.active').offsetTop - 200)
  }

  return {
    timeUpdate (e, viewer, autoscroll) {
      dispatch(updateTimes(e))
      if (autoscroll) autoscrollHandler(viewer)
    },
    seek (player, seconds) {
      player.currentTime = seconds
    },
    refPlayer (node) {
      dispatch(setAudioPlayer(node))
    },
    mountBookAndMedia (location) {
      dispatch(getBookAsync(location))
    },
    updateLocations (path, cb) {
      // Assure the locations are set before we actually retrieve them
      return new Promise((resolve) => {
        dispatch(setBookLocation(path + 'data.json'))
        dispatch(setAssetsLocation(path + 'assets/'))
        resolve(true)
      })
    },
    setActiveChapterWithScroll (scrollPos) {
      dispatch(setActiveChapter(scrollPos))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Book)
