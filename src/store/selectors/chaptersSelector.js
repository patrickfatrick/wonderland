export default state => (
  state.book.chapters.reduce((chapters, id) => {
    const chapter = state.chapters[id];
    if (chapter) chapters.push(chapter);
    return chapters;
  }, [])
);
