import chaptersSelector from "./chaptersSelector";

export default state => chaptersSelector(state).find(chapter => chapter.active);
