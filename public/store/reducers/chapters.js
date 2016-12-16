import initialState from './initial-state'

export default function (state = initialState.chapters, action) {
  function setActiveChapter (state, scrollPos) {
    let index
    state.forEach((chapter, i) => {
      if (!chapter.el) return
      if (scrollPos >= chapter.el.offsetTop - 20) index = i
    })

    return state.map((newChapter, i) => {
      if (i === index) return { ...newChapter, active: true }
      if (i !== index) return { ...newChapter, active: false }
      return newChapter
    })
  }

  switch (action.type) {
    case 'SET_CHAPTERS':
      return action.chapters.map((chapter) => {
        return { ...chapter, active: false }
      })
    case 'SET_CHAPTER_HEADING_EL':
      return state.map((chapter) => {
        if (chapter.title === action.title) return { ...chapter, el: action.el }
        return chapter
      })
    case 'SET_ACTIVE_CHAPTER':
      return setActiveChapter(state, action.scrollPos)
    default:
      return state
  }
}
