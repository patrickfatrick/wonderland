import { normalize, Schema, arrayOf } from 'normalizr';
import initialState from './initial-state';

export default function (state = initialState.book, action) {
  function normalizeData(data) {
    const book = new Schema('book');
    const chapter = new Schema('chapters', { defaults: { active: false } });
    const container = new Schema('containers');
    const line = new Schema('lines', { defaults: { active: false } });
    container.define({
      lines: arrayOf(line),
    });
    chapter.define({
      defaults: {
        active: false,
      },
      containers: arrayOf(container),
    });
    book.define({
      chapters: arrayOf(chapter),
    });
    return normalize(data, book).entities;
  }
  switch (action.type) {
    case 'SET_BOOK':
      return { ...state, ...normalizeData(action.book) };
    case 'SET_BOOK_LOCATION':
      return { ...state, bookLocation: action.location };
    case 'SET_ASSETS_LOCATION':
      return { ...state, assetsLocation: action.location };
    default:
      return state;
  }
}
