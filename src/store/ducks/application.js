import initialState from "../initial-state";

const SET_ASSETS_LOCATION = "application/SET_ASSETS_LOCATION";
const INCREMENT_RENDER_INDEX = "application/INCREMENT_RENDER_INDEX";
const SET_DARKMODE = "application/TOGGLE_DARKMODE";
const SET_AUDIO_ON = "application/SET_AUDIO_ON";
const SET_AUTOSCROLL_ON = "application/SET_AUTOSCROLL";
const SET_READER_CONTAINER_EL = "application/SET_READER_CONTAINER_EL";
const SET_AUDIO_PLAYER_EL = "application/SET_AUDIO_PLAYER_EL";
const SET_ACTIVE_LINE = "application/SET_ACTIVE_LINE";
const SET_ACTIVE_CHAPTER = "application/SET_ACTIVE_CHAPTER";

function renderIndexHandler(state, diff) {
  if (diff <= 0) return state;
  return { ...state, renderIndex: state.renderIndex + diff };
}

function setDarkmodeHandler(state, bool) {
  window.localStorage.setItem("darkmode", +bool);

  return { ...state, darkmode: bool };
}

function setActiveLineHandler(state, activeLine) {
  window.localStorage.setItem("activeLine", activeLine);
  return { ...state, activeLine };
}

function setActiveChapterHandler(state, activeChapter) {
  window.localStorage.setItem("activeChapter", activeChapter);
  return { ...state, activeChapter };
}

export default function reducer(state = initialState.application, action) {
  switch (action.type) {
    case SET_ASSETS_LOCATION:
      return { ...state, assetsLocation: action.location };
    case INCREMENT_RENDER_INDEX:
      return renderIndexHandler(state, action.diff);
    case SET_DARKMODE:
      return setDarkmodeHandler(state, action.bool);
    case SET_AUDIO_ON:
      return { ...state, audioOn: action.bool };
    case SET_AUTOSCROLL_ON:
      return { ...state, autoscrollOn: action.bool };
    case SET_READER_CONTAINER_EL:
      return { ...state, readerContainerElement: action.el };
    case SET_AUDIO_PLAYER_EL:
      return { ...state, audioPlayerElement: action.el };
    case SET_ACTIVE_LINE:
      return setActiveLineHandler(state, action.activeLine);
    case SET_ACTIVE_CHAPTER:
      return setActiveChapterHandler(state, action.activeChapter);
    default:
      return state;
  }
}


export function setAssetsLocation(location) {
  return { type: SET_ASSETS_LOCATION, location };
}

export function incrementRenderIndex(diff = 1) {
  return { type: INCREMENT_RENDER_INDEX, diff };
}

export function setDarkmode(bool) {
  return { type: SET_DARKMODE, bool };
}

export function setAudioOn(bool) {
  return { type: SET_AUDIO_ON, bool };
}

export function setAutoscrollOn(bool) {
  return { type: SET_AUTOSCROLL_ON, bool };
}

export function setReaderContainerEl(el) {
  return { type: SET_READER_CONTAINER_EL, el };
}

export function setAudioPlayerEl(el) {
  return { type: SET_AUDIO_PLAYER_EL, el };
}

export function setActiveLine(activeLine) {
  return { type: SET_ACTIVE_LINE, activeLine };
}

export function setActiveChapter(activeChapter) {
  return { type: SET_ACTIVE_CHAPTER, activeChapter };
}
