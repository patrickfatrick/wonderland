/* globals fetch */
import { normalize, Schema, arrayOf } from 'normalizr';

// See https://github.com/paularmstrong/normalizr
export default async function getBook(location) {
  const response = await fetch(location);
  const json = await response.json();
  const book = new Schema('book');
  const chapter = new Schema('chapters', { defaults: { active: false } });
  const container = new Schema('containers');
  const line = new Schema('lines', { defaults: { active: false } });
  container.define({
    lines: arrayOf(line),
  });
  chapter.define({
    containers: arrayOf(container),
  });
  book.define({
    chapters: arrayOf(chapter),
  });

  return normalize(json, book).entities;
}
