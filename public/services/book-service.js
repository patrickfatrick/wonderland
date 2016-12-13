/* globals fetch */

export function getCaptions (cb) {
  return fetch('./data/data.json')
  .then((response) => response.json())
  .then((response) => {
    const captions = response.captions.map((caption, i) => {
      if (i === 0) return { ...caption, active: true }
      return { ...caption, active: false }
    })
    cb(captions)
  })
}

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
