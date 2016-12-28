import initialState from './initial-state';

function normalizeData(state, data) {
  return {
    ...state,
    ...data,
    // Since there's only one book we can skip storing the `book` object as a keyed entity
    book: data.book[Object.keys(data.book)[0]],
  };
}

export default function (state = initialState.data, action) {
  switch (action.type) {
    case 'SET_BOOK':
      return normalizeData(state, action.data);
    case 'SET_BOOK_LOCATION':
      return { ...state, bookLocation: action.location };
    case 'SET_ASSETS_LOCATION':
      return { ...state, assetsLocation: action.location };
    case 'INCREMENT_RENDER_INDEX':
      return { ...state, renderIndex: state.renderIndex + 1 };
    default:
      return state;
  }
}
