export default (state) => {
  const {
    application: { renderIndex }, chapters, blocks, book: { chapters: chapterOrder },
  } = state;
  console.log(renderIndex);
  if (renderIndex < 0) return [];

  return chapterOrder.slice(0, renderIndex + 1)
    .map(chapterId => chapters[chapterId].blocks.map(blockId => blocks[blockId]))
    .reduce((arr, group) => [...arr, ...group], []);
};
