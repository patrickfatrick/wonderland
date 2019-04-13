/* globals fetch */

import "whatwg-fetch";
import { normalize, schema } from "normalizr";

// See https://github.com/paularmstrong/normalizr
export default async function getBook(location) {
  const response = await fetch(location);
  const json = await response.json();
  const book = new schema.Entity("book");
  const chapter = new schema.Entity("chapters", {}, {
    processStrategy(input) {
      return { ...input, active: false };
    },
  });
  const block = new schema.Entity("blocks");
  const line = new schema.Entity("lines", {}, {
    processStrategy(input) {
      return { ...input, active: false };
    },
  });
  block.define({
    lines: [line],
  });
  chapter.define({
    blocks: [block],
  });
  book.define({
    chapters: [chapter],
  });

  return normalize(json, book).entities;
}
