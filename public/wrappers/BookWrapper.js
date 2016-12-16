import { connect } from 'react-redux'
import { setTimestamp, setActiveLine, setAudioPlayer, setBook, setChapters, setBookLocation, setAssetsLocation, setActiveChapter, renderContainers } from '../store/actions'
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

function mapDispatchToProps (dispatch) {
  function getBookAsync (location) {
    return (dispatch, getState) => {
      getBook(location)
      .then((response) => {
        dispatch(setBook(response))
        dispatch(setChapters(response.chapters))
        dispatch(renderContainers(response))
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
    scrollHandler (book, scrollPos, clientHeight) {
      if (scrollPos >= clientHeight - 200) dispatch(renderContainers(book))
      dispatch(setActiveChapter(scrollPos))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Book)
