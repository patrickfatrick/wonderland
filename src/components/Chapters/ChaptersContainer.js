import { connect } from 'react-redux';
import { incrementRenderIndex } from '../../store/ducks/application';
import { renderBlocks } from '../../store/ducks/rendered-blocks';
import Chapters from './Chapters';

function mapStatetoProps(state) {
  return {
    chapters: state.chapters,
    chapterOrder: state.data.book.chapters,
    darkmode: state.application.darkmode,
    activeChapter: Object.keys(state.chapters).find(chapterId => state.chapters[chapterId].active),
    chapterSelectToggled: false,
    audioPlayerElement: state.audioPlayer.element,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  function updateRenderIndexAndRender(index) {
    return (dispatch, getState) => { // eslint-disable-line no-shadow
      const diff = index - getState().application.renderIndex;
      dispatch(incrementRenderIndex(diff));
      dispatch(renderBlocks(getState().data, getState().application.renderIndex, diff));
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
