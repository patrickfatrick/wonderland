import initialState from "../initial-state";

const SET_LINES = "lines/SET_LINES";
const SET_ACTIVE_LINE = "lines/SET_ACTIVE_LINE";

function setActiveLineHandler(state, prev, next) {
  if (prev === next) return state;

  window.localStorage.setItem("activeLine", next ?? "");

  return {
    ...state,
    ...(prev ? { [prev]: { ...state[prev], active: false } } : {}),
    ...(next ? { [next]: { ...state[next], active: true } } : {}),
  };
}

export default function reducer(state = initialState.lines, action) {
  switch (action.type) {
    case SET_LINES:
      return { ...state, ...action.lines };
    case SET_ACTIVE_LINE:
      return setActiveLineHandler(state, action.prev, action.next);
    default:
      return state;
  }
}

export function setLines(lines) {
  return { type: SET_LINES, lines };
}

export function setActiveLine(prev, next) {
  return { type: SET_ACTIVE_LINE, prev, next };
}
