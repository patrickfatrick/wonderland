import initialState from '../initial-state';

const SET_BOOK = 'book/SET_BOOK';

export default function reducer(state = initialState.book, action) {
  switch (action.type) {
    case SET_BOOK:
      return { ...state, ...action.book };
    default:
      return state;
  }
}

export function setBook(book) {
  return { type: SET_BOOK, book };
}
