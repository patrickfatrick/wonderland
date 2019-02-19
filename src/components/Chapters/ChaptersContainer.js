import { connect } from 'react-redux';
import Chapters from './Chapters';

function mapStatetoProps(state) {
  return {
    chapters: state.chapters,
    chapterOrder: state.data.book.chapters,
    darkmode: state.application.darkmode,
    activeChapter: Object.keys(state.chapters).find(chapterId => state.chapters[chapterId].active),
    chapterSelectToggled: false,
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps,
)(Chapters);
