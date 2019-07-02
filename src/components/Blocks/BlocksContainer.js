import { connect } from 'react-redux';
import { setChapterHeadingEl } from '../../store/ducks/chapters';
import selectRenderedBlocks from '../../store/selectors/renderedBlocksSelector';
import Blocks from './Blocks';

function mapStateToProps(state) {
  return {
    renderedBlocks: selectRenderedBlocks(state),
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
