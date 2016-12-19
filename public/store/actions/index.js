export function setBook(book) {
  return {
    type: 'SET_BOOK',
    book,
  };
}

export function setBookLocation(location) {
  return {
    type: 'SET_BOOK_LOCATION',
    location,
  };
}

export function setAssetsLocation(location) {
  return {
    type: 'SET_ASSETS_LOCATION',
    location,
  };
}

export function setAudioOn(bool) {
  return {
    type: 'SET_AUDIO_ON',
    bool,
  };
}

export function setAudioSrc(location) {
  return {
    type: 'SET_AUDIO_SRC',
    location,
  };
}

export function setChapters(chapters) {
  return {
    type: 'SET_CHAPTERS',
    chapters,
  };
}

export function setChapterHeadingEl(el, title) {
  return {
    type: 'SET_CHAPTER_HEADING_EL',
    el,
    title,
  };
}

export function setActiveChapter(scrollPos) {
  return {
    type: 'SET_ACTIVE_CHAPTER',
    scrollPos,
  };
}

export function renderContainers(book) {
  return {
    type: 'RENDER_CONTAINERS',
    book,
  };
}

export function setActiveLine(timestamp) {
  return {
    type: 'SET_ACTIVE_LINE',
    timestamp,
  };
}

export function setTimestamp(seconds) {
  return {
    type: 'SET_TIMESTAMP',
    seconds,
  };
}

export function setAutoscroll(bool) {
  return {
    type: 'SET_AUTOSCROLL',
    bool,
  };
}

export function setAudioPlayer(el) {
  return {
    type: 'SET_AUDIO_PLAYER',
    el,
  };
}

export function setBookViewerElement(el) {
  return {
    type: 'SET_BOOK_VIEWER_ELEMENT',
    el,
  };
}

export function updateBuffering(el) {
  return {
    type: 'UPDATE_BUFFERED_TIME',
    el,
  };
}
