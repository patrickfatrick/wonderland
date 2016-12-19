import { combineReducers } from 'redux';
import book from './book';
import chapters from './chapters';
import containers from './containers';
import audioPlayer from './audio-player';

export default combineReducers({
  book,
  chapters,
  containers,
  audioPlayer,
});
