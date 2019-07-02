import initialState from '../initial-state';

const SET_CHAPTERS = 'chapters/SET_CHAPTERS';
const SET_CHAPTER_HEADING_EL = 'chapters/SET_CHAPTER_HEADING_EL';

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
