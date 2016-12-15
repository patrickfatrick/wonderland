import { connect } from 'react-redux'
import { setTimestamp, setActiveLine, setAudioPlayer, setBook, setChapters, setContainers, setBookLocation, setAssetsLocation, setActiveChapter } from '../store/actions'
import { getBook } from '../services/book-service'
import Book from '../components/Book.jsx'

function mapStateToProps (state) {
  return {
    audioOn: state.audioPlayer.audioOn,
    autoscroll: state.audioPlayer.autoscroll,
    chapters: state.chapters,
    timestamp: state.audioPlayer.timestamp,
    player: state.audioPlayer.element,
    bookViewer: state.audioPlayer.bookViewer,
    book: state.book
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  function getBookAsync (location) {
    return (dispatch, getState) => {
      getBook(location)
      .then((response) => {
        dispatch(setBook(response))
        dispatch(setChapters(response.chapters))
        dispatch(setContainers(response))
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
    mountBookAndAssets (path) {
      dispatch(getBookAsync(path + 'data.json'))
      dispatch(setBookLocation(path + 'data.json'))
      dispatch(setAssetsLocation(path + 'assets/'))
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
