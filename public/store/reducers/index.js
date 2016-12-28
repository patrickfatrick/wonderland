import { combineReducers } from 'redux';
import data from './data';
import chapters from './chapters';
import renderedContainers from './rendered-containers';
import lines from './lines';
import audioPlayer from './audio-player';

export default combineReducers({
  data,
  chapters,
  renderedContainers,
  lines,
  audioPlayer,
});
