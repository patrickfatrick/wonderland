import initialState from './initial-state'

export default function (state = initialState.audioPlayer, action) {
  switch (action.type) {
    case 'SET_AUDIO_ON':
      return { ...state, audioOn: action.bool }
    case 'SET_AUDIO_PLAYER':
      return { ...state, element: action.el }
    case 'SET_AUDIO_SRC':
      return { ...state, audioSrc: action.location }
    case 'SET_TIMESTAMP':
      return { ...state, timestamp: action.seconds }
    case 'SET_AUTOSCROLL':
      return { ...state, autoscroll: action.bool }
    case 'SET_BOOK_VIEWER':
      return { ...state, bookViewer: action.el }
    default:
      return state
  }
}
