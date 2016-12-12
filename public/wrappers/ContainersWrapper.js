import { connect } from 'react-redux'
import { setBookViewer, setChapterHeadingEl } from '../store/actions'
import Containers from '../components/Containers.jsx'

function mapStateToProps (state) {
  function assemblePageItems (containers, chapters) {
    const chapterParagraphs = assembleChapters(containers)
    .map((containers, i) => {
      const temp = []
      containers.forEach((container) => {
        if (!temp[container.containerId]) temp[container.containerId] = []
        temp[container.containerId].push(container)
      })
      temp.unshift([{ type: 'chapterheading', title: chapters[i].title }])
      return temp
    })
    return [].concat(...chapterParagraphs)
  }

  function assembleChapters (containers) {
    const chapters = []
    containers.forEach((container, i) => {
      if (!chapters[container.chapterId]) chapters[container.chapterId] = []
      chapters[container.chapterId].push(container)
    })
    return chapters
  }

  return {
    chapters: state.chapters,
    pageItems: assemblePageItems(state.containers, state.chapters),
    imagesLocation: state.book.assetsLocation + 'images/'
  }
}

function mapDispatchToProps (dispatch) {
  return {
    refBookViewer (el) {
      dispatch(setBookViewer(el))
    },
    refChapterHeading (el, title) {
      dispatch(setChapterHeadingEl(el, title))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Containers)
