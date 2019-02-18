import initialState from './initial-state';

const RENDER_BLOCKS = 'rendered-blocks/RENDER_BLOCKS';

// Adds blocks to the renderedBlocks array in the state
// Which is what is actually rendered
function renderBlocksHandler(state, { book, chapters, blocks }, renderIndex, diff) {
  // Return early if we've already rendered everything
  if (renderIndex >= book.chapters.length) return state;
  if (diff <= 0) return state;

  // If not, add the next chapter's blocks to the array
  //
  // This is basically working backwards from the renderIndex,
  // which has already been updated. The diff
  // indicates how many chapters need to be rendered.
  // First get the correct chapter IDs from the book,
  // reverse them to be in order, then get the blocks for
  // those chapters, finally flatten the whole thing down into
  // a array with no nesting.
  const blocksToRender = [...Array(diff)]
    .map((_, i) => book.chapters[renderIndex - i])
    .reverse()
    .map(chapterId => chapters[chapterId].blocks.map(blockId => blocks[blockId]))
    .reduce((arr, group) => [...arr, ...group], []);

  return [
    ...state,
    ...blocksToRender,
  ];
}

export default function reducer(state = initialState.renderedBlocks, action) {
  switch (action.type) {
    case RENDER_BLOCKS:
      return renderBlocksHandler(state, action.data, action.renderIndex, action.diff);
    default:
      return state;
  }
}

export function renderBlocks(data, renderIndex, diff = 1) {
  return {
    type: RENDER_BLOCKS, data, renderIndex, diff,
  };
}
