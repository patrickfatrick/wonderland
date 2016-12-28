import initialState from './initial-state';

// Adds containers to the renderedContainers array in the state
// Which is what is actually rendered
function renderContainers(state, { book, chapters, containers, renderIndex }) {
  // Return early if we've already rendered everything
  if (renderIndex >= book.chapters.length) return state;

  // If not, add the next chapter's containers to the array
  const chapterId = book.chapters[renderIndex];
  return [
    ...state,
    ...chapters[chapterId].containers.map(containerId => containers[containerId]),
  ];
}

export default function (state = initialState.renderedContainers, action) {
  switch (action.type) {
    case 'RENDER_CONTAINERS':
      return renderContainers(state, action.data);
    default:
      return state;
  }
}
