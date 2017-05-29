import { connect } from 'react-redux';
import { incrementRenderIndex } from '../store/ducks/data';
import { renderContainers } from '../store/ducks/rendered-containers';
import Chapters from '../components/Chapters';

function mapStatetoProps(state) {
  return {
    chapters: state.chapters,
    chapterOrder: state.data.book.chapters,
    darkmode: state.data.darkmode,
    activeChapter: Object.keys(state.chapters).find(chapterId => state.chapters[chapterId].active),
    chapterSelectToggled: false,
    audioPlayerElement: state.audioPlayer.element,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  function updateRenderIndexAndRender(index) {
    return (dispatch, getState) => { // eslint-disable-line no-shadow
      const diff = index - getState().data.renderIndex;
      dispatch(incrementRenderIndex(diff));
      dispatch(renderContainers(getState().data, diff));
    };
  }

  return {
    chapterSelectHandler(index, player, seconds) {
      ownProps.seek(player, seconds);
      dispatch(updateRenderIndexAndRender(index));
    },
  };
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps,
)(Chapters);
