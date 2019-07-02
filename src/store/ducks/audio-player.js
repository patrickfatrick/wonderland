import initialState from '../initial-state';

const SET_AUDIO_SRC = 'audio-player/SET_AUDIO_SRC';
const SET_TIMESTAMP = 'audio-player/SET_TIMESTAMP';
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
    case SET_AUDIO_SRC:
      return { ...state, audioSrc: action.location };
    case SET_TIMESTAMP:
      return { ...state, timestamp: action.seconds };
    case UPDATE_BUFFERED_TIME:
      return updateBufferedTimeHandler(state, action.el);
    default:
      return state;
  }
}

export function setAudioSrc(location) {
  return { type: SET_AUDIO_SRC, location };
}

export function setTimestamp(seconds) {
  return { type: SET_TIMESTAMP, seconds };
}

export function updateBufferedTime(el) {
  return { type: UPDATE_BUFFERED_TIME, el };
}
