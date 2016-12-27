export default {
  // For the purposes of this demo, path is passed in from the top-level App component
  path: '',
  book: {
    bookLocation: '',
    assetsLocation: '',
    audioSrc: '',
    info: {
      title: '',
      author: '',
    },
    chapters: [],
    containers: [],
    lines: [],
  },
  // chapters: [],
  renderedContainers: [],
  lines: [],
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
