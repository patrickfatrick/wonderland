import initialState from './initial-state';

const RENDER_CONTAINERS = 'rendered-containers/RENDER_CONTAINERS';

// Adds containers to the renderedContainers array in the state
// Which is what is actually rendered
function renderContainersHandler(state, { book, chapters, containers, renderIndex }) {
  // Return early if we've already rendered everything
  if (renderIndex >= book.chapters.length) return state;

  // If not, add the next chapter's containers to the array
  const chapterId = book.chapters[renderIndex];
  return [
    ...state,
    ...chapters[chapterId].containers.map(containerId => containers[containerId]),
  ];
}

export default function reducer(state = initialState.renderedContainers, action) {
  switch (action.type) {
    case RENDER_CONTAINERS:
      return renderContainersHandler(state, action.data);
    default:
      return state;
  }
}

export function renderContainers(data) {
  return { type: RENDER_CONTAINERS, data };
}
