import initialState from './initial-state';

const SET_AUDIO_ON = 'audio-player/SET_AUDIO_ON';
const SET_AUDIO_PLAYER = 'audio-player/SET_AUDIO_PLAYER';
const SET_AUDIO_SRC = 'audio-player/SET_AUDIO_SRC';
const SET_TIMESTAMP = 'audio-player/SET_TIMESTAMP';
const SET_AUTOSCROLL = 'audio-player/SET_AUTOSCROLL';
const SET_BOOK_VIEWER_ELEMENT = 'audio-player/SET_BOOK_VIEWER_ELEMENT';
const UPDATE_BUFFERED_TIME = 'audio-player/UPDATE_BUFFERED_TIME';

function updateBufferedTimeHandler(state, audioElement) {
  // Length should not be more than 1
  if (audioElement.buffered.length) {
    // Chrome behaves very strangely with buffer times while playing,
    // so this is as good as it gets for checking
    return { ...state, buffering: !audioElement.buffered.end(0) };
  }
  // Return true if audio is playing but we don't have a buffer yet
  if (!audioElement.paused) return { ...state, buffering: true };
  return { ...state, buffering: false };
}

export default function reducer(state = initialState.audioPlayer, action) {
  switch (action.type) {
    case SET_AUDIO_ON:
      return { ...state, audioOn: action.bool };
    case SET_AUDIO_PLAYER:
      return { ...state, element: action.el };
    case SET_AUDIO_SRC:
      return { ...state, audioSrc: action.location };
    case SET_TIMESTAMP:
      return { ...state, timestamp: action.seconds };
    case SET_AUTOSCROLL:
      return { ...state, autoscroll: action.bool };
    case SET_BOOK_VIEWER_ELEMENT:
      return { ...state, bookViewerElement: action.el };
    case UPDATE_BUFFERED_TIME:
      return updateBufferedTimeHandler(state, action.el);
    default:
      return state;
  }
}

export function setAudioOn(bool) {
  return { type: SET_AUDIO_ON, bool };
}

export function setAudioPlayer(el) {
  return { type: SET_AUDIO_PLAYER, el };
}

export function setAudioSrc(location) {
  return { type: SET_AUDIO_SRC, location };
}

export function setTimestamp(seconds) {
  return { type: SET_TIMESTAMP, seconds };
}

export function setAutoscroll(bool) {
  return { type: SET_AUTOSCROLL, bool };
}

export function setBookViewerElement(el) {
  return { type: SET_BOOK_VIEWER_ELEMENT, el };
}

export function updateBufferedTime(el) {
  return { type: UPDATE_BUFFERED_TIME, el };
}
