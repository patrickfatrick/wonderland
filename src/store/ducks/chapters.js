import { isSmallScreen } from '../../lib/utils';
import initialState from './initial-state';

const SET_CHAPTERS = 'chapters/SET_CHAPTERS';
const SET_CHAPTER_HEADING_EL = 'chapters/SET_CHAPTER_HEADING_EL';
const SET_ACTIVE_CHAPTER = 'chapters/SET_ACTIVE_CHAPTER';

// Controls the displayed chapter heading in the NavBar
// Follows the same pattern as `setActiveLine`
function setActiveChapterHandler(state, scrollPos) {
  const prev = Object.keys(state).find(chapterId => state[chapterId].active);
  const next = Object.keys(state).reverse().find(chapterId => (
    state[chapterId].el &&
    (scrollPos >= state[chapterId].el.offsetTop - (isSmallScreen() ? 75 : 30))
  ));

  // Return early if they match
  if (prev === next) return state;

  // Reconstruct the state
  // Do not set next if it's undefined
  if (!next) {
    return {
      ...state,
      [prev]: { ...state[prev], active: false },
    };
  }

  return {
    ...state,
    [prev]: { ...state[prev], active: false },
    [next]: { ...state[next], active: true },
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
      return setActiveChapterHandler(state, action.scrollPos);
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

export function setActiveChapter(scrollPos) {
  return { type: SET_ACTIVE_CHAPTER, scrollPos };
}
