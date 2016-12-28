import { connect } from 'react-redux';
import { setBookViewerElement, setChapterHeadingEl } from '../store/actions';
import Containers from '../components/Containers';

function mapStateToProps(state) {
  return {
    chapters: state.data.chapters,
    pageItems: state.renderedContainers,
    imagesLocation: `${state.data.assetsLocation}images/`,
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
)(Containers);
