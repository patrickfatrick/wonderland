export default {
  // For the purposes of this demo, path is passed in from the top-level App component
  path: '',
  book: {
    bookLocation: '',
    assetsLocation: '',
    info: {
      title: '',
      author: '',
    },
    chapters: [],
  },
  chapters: [],
  containers: [],
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
