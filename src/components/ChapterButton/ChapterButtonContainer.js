import { connect } from 'react-redux';
import { incrementRenderIndex } from '../../store/ducks/application';
import { renderBlocks } from '../../store/ducks/rendered-blocks';
import { seek } from '../../lib/utils';
import ChapterButton from './ChapterButton';

function mapStatetoProps({ application, audioPlayer }) {
  return {
    darkmode: application.darkmode,
    audioPlayerElement: audioPlayer.element,
  };
}

function mapDispatchToProps(dispatch) {
  function updateRenderIndexAndRender(index) {
    return (dispatch, getState) => { // eslint-disable-line no-shadow
      const diff = index - getState().application.renderIndex;
      dispatch(incrementRenderIndex(diff));
      dispatch(renderBlocks(getState().data, getState().application.renderIndex, diff));
    };
  }

  return {
    chapterSelectHandler(index, player, seconds) {
      seek(player, seconds);
      dispatch(updateRenderIndexAndRender(index));
    },
  };
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps,
)(ChapterButton);
