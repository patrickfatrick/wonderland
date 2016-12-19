import { connect } from 'react-redux';
import { setBookViewerElement, setChapterHeadingEl } from '../store/actions';
import Containers from '../components/Containers';

function mapStateToProps(state) {
  function assembleChapters(containers) {
    const chapters = [];
    containers.forEach((container) => {
      if (!chapters[container.chapterId]) chapters[container.chapterId] = [];
      chapters[container.chapterId].push(container);
    });
    return chapters;
  }

  function assemblePageItems(containers) {
    const chapterParagraphs = assembleChapters(containers)
    .map((chapter) => {
      const temp = [];
      chapter.forEach((container) => {
        if (!temp[container.containerId]) temp[container.containerId] = [];
        temp[container.containerId].push(container);
      });
      return temp;
    });
    return [].concat(...chapterParagraphs);
  }

  return {
    chapters: state.chapters,
    pageItems: assemblePageItems(state.containers),
    imagesLocation: `${state.book.assetsLocation}images/`,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    refBookViewer(el) {
      dispatch(setBookViewerElement(el));
    },
    refChapterHeading(el, title) {
      dispatch(setChapterHeadingEl(el, title));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Containers);
