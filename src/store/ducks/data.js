import initialState from './initial-state';

const SET_BOOK = 'data/SET_BOOK';

function normalizeData(state, data) {
  return {
    ...state,
    ...data,
    // Since there's only one book we can skip storing the `book` object as a keyed entity
    book: data.book[Object.keys(data.book)[0]],
  };
}

export default function reducer(state = initialState.data, action) {
  switch (action.type) {
    case SET_BOOK:
      return normalizeData(state, action.data);
    default:
      return state;
  }
}

export function setBook(data) {
  return { type: SET_BOOK, data };
}
