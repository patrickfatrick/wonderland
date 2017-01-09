/* globals fetch */
import { normalize, schema } from 'normalizr';

// See https://github.com/paularmstrong/normalizr
export default async function getBook(location) {
  const response = await fetch(location);
  const json = await response.json();
  const book = new schema.Entity('book');
  const chapter = new schema.Entity('chapters', {}, {
    processStrategy(input) {
      return { ...input, active: false };
    },
  });
  const container = new schema.Entity('containers');
  const line = new schema.Entity('lines', {}, {
    processStrategy(input) {
      return { ...input, active: false };
    },
  });
  container.define({
    lines: [line],
  });
  chapter.define({
    containers: [container],
  });
  book.define({
    chapters: [chapter],
  });

  return normalize(json, book).entities;
}
