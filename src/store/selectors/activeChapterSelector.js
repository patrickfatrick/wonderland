import chaptersSelector from "./chaptersSelector";

export default state => chaptersSelector(state)
  .find(chapter => chapter.id === state.application.activeChapter);
