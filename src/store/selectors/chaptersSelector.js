export default state => (
  state.data.book.chapters.reduce((chapters, id) => {
    const chapter = state.chapters[id];
    if (chapter) chapters.push(chapter);
    return chapters;
  }, [])
);
