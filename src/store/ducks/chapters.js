import initialState from './initial-state';

const SET_CHAPTERS = 'chapters/SET_CHAPTERS';
const SET_CHAPTER_HEADING_EL = 'chapters/SET_CHAPTER_HEADING_EL';
const SET_ACTIVE_CHAPTER = 'chapters/SET_ACTIVE_CHAPTER';

function setActiveChapterHandler(state, prev, next) {
  if (prev === next) return state;

  return {
    ...state,
    ...(prev ? { [prev]: { ...state[prev], active: false } } : {}),
    ...(next ? { [next]: { ...state[next], active: true } } : {}),
  };
}

function setChapterHeadingElHandler(state, chapterId, el) {
  const chapter = state[chapterId];
  return {
    ...state,
    [chapterId]: { ...chapter, el },
  };
}

export default function reducer(state = initialState.chapters, action) {
  switch (action.type) {
    case SET_CHAPTERS:
      return { ...state, ...action.chapters };
    case SET_CHAPTER_HEADING_EL:
      return setChapterHeadingElHandler(state, action.chapterId, action.el);
    case SET_ACTIVE_CHAPTER:
      return setActiveChapterHandler(state, action.prev, action.next);
    default:
      return state;
  }
}

export function setChapters(chapters) {
  return { type: SET_CHAPTERS, chapters };
}

export function setChapterHeadingEl(el, chapterId) {
  return { type: SET_CHAPTER_HEADING_EL, el, chapterId };
}

export function setActiveChapter(prev, next) {
  return { type: SET_ACTIVE_CHAPTER, prev, next };
}
