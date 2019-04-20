export default (state) => {
  const {
    application: { renderIndex }, chapters, blocks, book: { chapters: chapterOrder },
  } = state;

  if (renderIndex < 0) return [];

  return chapterOrder.slice(0, renderIndex + 1)
    .flatMap(chapterId => chapters[chapterId].blocks.map(blockId => blocks[blockId]));
};
