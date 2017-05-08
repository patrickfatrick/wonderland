import initialState from './initial-state';

const RENDER_CONTAINERS = 'rendered-containers/RENDER_CONTAINERS';

// Adds containers to the renderedContainers array in the state
// Which is what is actually rendered
function renderContainersHandler(state, { book, chapters, containers, renderIndex }, diff) {
  // Return early if we've already rendered everything
  if (renderIndex >= book.chapters.length) return state;
  if (diff <= 0) return state;

  // If not, add the next chapter's containers to the array
  //
  // This is basically working backwards from the renderIndex,
  // which has already been updated. The diff
  // indicates how many chapters need to be rendered.
  // First get the correct chapter IDs from the book,
  // reverse them to be in order, then get the containers for
  // those chapters, finally flatten the whole thing down into
  // a array with no nesting.
  const containersToRender = [...Array(diff)]
  .map((_, i) => book.chapters[renderIndex - i])
  .reverse()
  .map(chapterId => chapters[chapterId].containers.map(containerId => containers[containerId]))
  .reduce((arr, group) => [...arr, ...group], []);

  return [
    ...state,
    ...containersToRender,
  ];
}

export default function reducer(state = initialState.renderedContainers, action) {
  switch (action.type) {
    case RENDER_CONTAINERS:
      return renderContainersHandler(state, action.data, action.diff);
    default:
      return state;
  }
}

export function renderContainers(data, diff = 1) {
  return { type: RENDER_CONTAINERS, data, diff };
}
