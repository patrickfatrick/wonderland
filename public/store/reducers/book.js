import initialState from './initial-state';

export default function (state = initialState.book, action) {
  switch (action.type) {
    case 'SET_BOOK':
      return { ...state, ...action.book };
    case 'SET_BOOK_LOCATION':
      return { ...state, bookLocation: action.location };
    case 'SET_ASSETS_LOCATION':
      return { ...state, assetsLocation: action.location };
    default:
      return state;
  }
}
