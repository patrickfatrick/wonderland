import initialState from '../initial-state';

const SET_BLOCKS = 'blocks/SET_BLOCKS';

export default function reducer(state = initialState.blocks, action) {
  switch (action.type) {
    case SET_BLOCKS:
      return { ...state, ...action.blocks };
    default:
      return state;
  }
}

export function setBlocks(blocks) {
  return {
    type: SET_BLOCKS, blocks,
  };
}
