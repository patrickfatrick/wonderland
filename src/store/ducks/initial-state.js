/* globals window */

/**
 * From normalizr, `data` will look like the following,
 * where ids are stored in arrays inside the parent object for order's sake,
 * and the actual object is stored with the id as its key in a separate object,
 * making the data overall much flatter:
 *
 * book: { ... , chapters: ['id1', 'id2'] },
 * chapters: {
 *   id1: { ... , containers: ['id3', 'id4'] },
 *   id2: { ... , containers: ['id5', 'id6'] },
 * },
 * containers: {
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
  data: {
    book: {
      audio: {
        src: '',
        size: 0,
      },
      frontmatter: [],
      info: {
        title: '',
        author: '',
      },
      chapters: [],
      backmatter: [],
    },
    chapters: {},
    containers: {},
    lines: {},
    renderIndex: -1,
    bookLocation: '',
    assetsLocation: '',
    darkmode: Object.prototype.hasOwnProperty.call(window.localStorage, 'darkmode')
    ? window.localStorage.getItem('darkmode') === 'true'
    : false,
  },
  chapters: {},
  renderedContainers: [],
  lines: {},
  audioPlayer: {
    audioSrc: '',
    audioOn: false,
    autoscroll: false,
    bookViewerElement: null,
    buffering: false,
    element: null,
    timestamp: 0,
  },
};
