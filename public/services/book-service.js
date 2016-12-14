/* globals fetch */

export function getBook (location, cb) {
  return fetch(location)
  .then((response) => response.json())
  .then((json) => cb(json))
}
