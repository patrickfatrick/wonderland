import initialState from './initial-state';

function updateBuffering(state, audioElement) {
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

export default function (state = initialState.audioPlayer, action) {
  switch (action.type) {
    case 'SET_AUDIO_ON':
      return { ...state, audioOn: action.bool };
    case 'SET_AUDIO_PLAYER':
      return { ...state, element: action.el };
    case 'SET_AUDIO_SRC':
      return { ...state, audioSrc: action.location };
    case 'SET_TIMESTAMP':
      return { ...state, timestamp: action.seconds };
    case 'SET_AUTOSCROLL':
      return { ...state, autoscroll: action.bool };
    case 'SET_BOOK_VIEWER_ELEMENT':
      return { ...state, bookViewerElement: action.el };
    case 'UPDATE_BUFFERED_TIME':
      return updateBuffering(state, action.el);
    default:
      return state;
  }
}
