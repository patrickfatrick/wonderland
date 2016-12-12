import initialState from './initial-state'

export default function (state = initialState.chapters, action) {
  function setActiveChapter (state, scrollPos) {
    let index
    const newState = state.map((chapter, i) => {
      if (scrollPos < chapter.el.offsetTop) return { ...chapter, active: false }
      if (scrollPos >= chapter.el.offsetTop) {
        index = i
        return { ...chapter, active: true }
      }
      return chapter
    })

    return newState.map((chapter, i) => {
      if (i < index) return { ...chapter, active: false }
      return chapter
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
