/* globals fetch */

export function getBook (location, cb) {
  return fetch(location)
  .then((response) => response.json())
  .then((json) => cb(json))
}

export function getMedia (location, cb) {
  return fetch(location)
  .then((response) => response.blob())
  .then((blob) => cb(blob))
}
