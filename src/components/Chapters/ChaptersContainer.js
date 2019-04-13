import { connect } from "react-redux";
import selectChapters from "../../store/selectors/chaptersSelector";
import selectActiveChapter from "../../store/selectors/activeChapterSelector";
import Chapters from "./Chapters";

function mapStatetoProps(state) {
  return {
    chapters: selectChapters(state),
    darkmode: state.application.darkmode,
    activeChapter: selectActiveChapter(state),
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
