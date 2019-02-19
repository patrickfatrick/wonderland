import { connect } from 'react-redux';
import Chapters from './Chapters';

function mapStatetoProps({ chapters, data, application }) {
  return {
    chapters,
    chapterOrder: data.book.chapters,
    darkmode: application.darkmode,
    activeChapter: Object.keys(chapters).find(chapterId => chapters[chapterId].active),
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
