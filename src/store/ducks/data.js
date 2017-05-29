import initialState from './initial-state';

const SET_BOOK = 'data/SET_BOOK';
const SET_BOOK_LOCATION = 'data/SET_BOOK_LOCATION';
const SET_ASSETS_LOCATION = 'data/SET_ASSETS_LOCATION';
const INCREMENT_RENDER_INDEX = 'data/INCREMENT_RENDER_INDEX';
const SET_DARKMODE = 'data/TOGGLE_DARKMODE';

function normalizeData(state, data) {
  return {
    ...state,
    ...data,
    // Since there's only one book we can skip storing the `book` object as a keyed entity
    book: data.book[Object.keys(data.book)[0]],
  };
}

function renderIndexHandler(state, diff) {
  if (diff <= 0) return state;
  return { ...state, renderIndex: state.renderIndex + diff };
}

export default function reducer(state = initialState.data, action) {
  switch (action.type) {
    case SET_BOOK:
      return normalizeData(state, action.data);
    case SET_BOOK_LOCATION:
      return { ...state, bookLocation: action.location };
    case SET_ASSETS_LOCATION:
      return { ...state, assetsLocation: action.location };
    case INCREMENT_RENDER_INDEX:
      return renderIndexHandler(state, action.diff);
    case SET_DARKMODE:
      return { ...state, darkmode: action.bool };
    default:
      return state;
  }
}

export function setBook(data) {
  return { type: SET_BOOK, data };
}

export function setBookLocation(location) {
  return { type: SET_BOOK_LOCATION, location };
}

export function setAssetsLocation(location) {
  return { type: SET_ASSETS_LOCATION, location };
}

export function incrementRenderIndex(diff = 1) {
  return { type: INCREMENT_RENDER_INDEX, diff };
}

export function setDarkmode(bool) {
  return { type: SET_DARKMODE, bool };
}
