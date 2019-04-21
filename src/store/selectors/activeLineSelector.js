import selectLines from "./linesSelector";

export default state => selectLines(state).find(line => line.id === state.application.activeLine);
