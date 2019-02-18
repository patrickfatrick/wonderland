import { connect } from 'react-redux';
import { setBookViewerElement } from '../../store/ducks/audio-player';
import { setChapterHeadingEl } from '../../store/ducks/chapters';
import Blocks from './Blocks';

function mapStateToProps(state) {
  return {
    chapters: state.data.chapters,
    pageItems: state.renderedBlocks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    refBookViewer(el) {
      dispatch(setBookViewerElement(el));
    },
    refChapterHeading(el, chapterId) {
      dispatch(setChapterHeadingEl(el, chapterId));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Blocks);
