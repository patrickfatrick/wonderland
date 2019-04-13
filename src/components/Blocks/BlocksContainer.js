import { connect } from "react-redux";
import { setChapterHeadingEl } from "../../store/ducks/chapters";
import Blocks from "./Blocks";

function mapStateToProps({ renderedBlocks }) {
  return {
    renderedBlocks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    refChapterHeading(el, chapterId) {
      dispatch(setChapterHeadingEl(el, chapterId));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Blocks);
