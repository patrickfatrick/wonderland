import { connect } from 'react-redux';
import { incrementRenderIndex } from '../../store/ducks/application';
import { renderBlocks } from '../../store/ducks/rendered-blocks';
import { setTimestamp } from '../../store/ducks/audio-player';
import ChapterButton from './ChapterButton';

function mapStatetoProps({ application, audioPlayer }) {
  return {
    darkmode: application.darkmode,
    audioPlayerElement: audioPlayer.element,
  };
}

function updateRenderIndexAndRender(index) {
  return (dispatch, getState) => { // eslint-disable-line no-shadow
    const diff = index - getState().application.renderIndex;
    dispatch(incrementRenderIndex(diff));
    dispatch(renderBlocks(getState().data, getState().application.renderIndex, diff));
  };
}

function mapDispatchToProps(dispatch) {
  return {
    renderMore(index) {
      dispatch(updateRenderIndexAndRender(index));
    },
    updateAudioTimestamp(timestamp) {
      dispatch(setTimestamp(timestamp));
    },
  };
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps,
)(ChapterButton);
