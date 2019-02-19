import { connect } from 'react-redux';
import { setBookViewerElement } from '../../store/ducks/audio-player';
import { setChapterHeadingEl } from '../../store/ducks/chapters';
import Blocks from './Blocks';

function mapStateToProps({ data, renderedBlocks }) {
  return {
    chapters: data.chapters,
    pageItems: renderedBlocks,
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
