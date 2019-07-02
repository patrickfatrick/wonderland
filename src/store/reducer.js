import { combineReducers } from 'redux';
import application from './ducks/application';
import book from './ducks/book';
import chapters from './ducks/chapters';
import blocks from './ducks/blocks';
import lines from './ducks/lines';
import audioPlayer from './ducks/audio-player';

export default combineReducers({
  application,
  book,
  chapters,
  blocks,
  lines,
  audioPlayer,
});
