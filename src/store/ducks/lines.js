import initialState from "../initial-state";

const SET_LINES = "lines/SET_LINES";

export default function reducer(state = initialState.lines, action) {
  switch (action.type) {
    case SET_LINES:
      return { ...state, ...action.lines };
    default:
      return state;
  }
}

export function setLines(lines) {
  return { type: SET_LINES, lines };
}
