import initialState from './initial-state';

// Controls the highlighted line when audio is playing.
// Follows the same pattern as `setActiveChapter`
function setActiveLine(state, timestamp) {
  // First finds the current active line, then what it should be based on the timestamp
  const prev = Object.keys(state).find(lineId => state[lineId].active);
  const next = Object.keys(state).find(lineId => (
    timestamp >= state[lineId].timestampStart && timestamp < state[lineId].timestampEnd
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

export default function (state = initialState.lines, action) {
  switch (action.type) {
    case 'SET_LINES':
      return { ...state, ...action.lines };
    case 'SET_ACTIVE_LINE':
      return setActiveLine(state, action.timestamp);
    default:
      return state;
  }
}
