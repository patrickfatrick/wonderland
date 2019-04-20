/**
 * From normalizr, `data` will look like the following,
 * where ids are stored in arrays inside the parent object for order's sake,
 * and the actual object is stored with the id as its key in a separate object,
 * making the data overall much flatter:
 *
 * book: { ... , chapters: ['id1', 'id2'] },
 * chapters: {
 *   id1: { ... , blocks: ['id3', 'id4'] },
 *   id2: { ... , blocks: ['id5', 'id6'] },
 * },
 * blocks: {
 *   id3: { ... , lines: ['id7', 'id8'] },
 *   id4: { ... , lines: ['id9', 'id10'] },
 *   id5: { ... , lines: ['id11', 'id12'] },
 *   id6: { ... , lines: ['id13', 'id14'] },
 * },
 * lines: {
 *   id7: { ... },
 *   id8: { ... },
 *   id9: { ... },
 *   id10: { ... },
 *   id11: { ... },
 *   id12: { ... },
 *   id13: { ... },
 *   id14: { ... },
 * }
 */

export default {
  application: {
    readerContainerElement: null,
    audioPlayerElement: null,
    renderIndex: -1,
    assetsLocation: "",
    audioOn: false,
    autoscrollOn: false,
    darkmode:
      window.localStorage.getItem("darkmode") ?? "0"
        |> Number.parseInt(?, 10)
        |> Boolean,
    activeChapter:
      window.localStorage.getItem("activeChapter") ?? null,
    activeLine:
      window.localStorage.getItem("activeLine") ?? null,
  },
  book: {
    audio: {
      src: "",
      size: 0,
      duration: 0,
    },
    frontmatter: [],
    info: {
      title: "",
      author: "",
      performers: [],
    },
    chapters: [],
    backmatter: [],
  },
  chapters: {},
  blocks: {},
  lines: {},
  audioPlayer: {
    audioSrc: "",
    buffering: false,
    timestamp: 0,
  },
};
