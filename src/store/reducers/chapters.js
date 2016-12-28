import initialState from './initial-state';

// Controls the displayed chapter heading in the NavBar
// Follows the same pattern as `setActiveLine`
function setActiveChapter(state, scrollPos) {
  const prev = Object.keys(state).find(chapterId => state[chapterId].active);
  const next = Object.keys(state).reverse().find(chapterId => (
    state[chapterId].el && (scrollPos >= state[chapterId].el.offsetTop - 20)
  ));

  // Return early if they match
  if (prev === next) return state;

  // Reconstruct the state
  return {
    ...state,
    [prev]: { ...state[prev], active: false },
    [next]: { ...state[next], active: true },
  };
}

function setChapterHeadingEl(state, chapterId, el) {
  const chapter = state[chapterId];
  return {
    ...state,
    [chapterId]: { ...chapter, el },
  };
}

export default function (state = initialState.chapters, action) {
  switch (action.type) {
    case 'SET_CHAPTERS':
      return { ...state, ...action.chapters };
    case 'SET_CHAPTER_HEADING_EL':
      return setChapterHeadingEl(state, action.chapterId, action.el);
    case 'SET_ACTIVE_CHAPTER':
      return setActiveChapter(state, action.scrollPos);
    default:
      return state;
  }
}
