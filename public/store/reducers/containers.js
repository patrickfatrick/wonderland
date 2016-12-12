import initialState from './initial-state'

export default function (state = initialState.containers, action) {
  function setContainers (state, book) {
    const containers = []
    book.chapters.forEach((chapter, chapterIndex) => {
      chapter.containers.forEach((container, containerIndex) => {
        if (container.type === 'paragraph') {
          containers.push(...container.lines.map((line) => {
            return { ...line, active: false, containerId: containerIndex, chapterId: chapterIndex }
          }))
        } else {
          containers.push({ ...container, containerId: containerIndex, chapterId: chapterIndex })
        }
      })
    })
    return containers
  }

  function setActiveLine (state, timestamp) {
    const prev = state.findIndex((container) => container.active)
    const next = state.findIndex((container) => (timestamp >= container.timestampStart && timestamp < container.timestampEnd))
    if (prev === next) return state
    return state.map((container, i) => {
      if (i === prev) return { ...container, active: false }
      if (i === next) return { ...container, active: true }
      return container
    })
  }

  switch (action.type) {
    case 'SET_CONTAINERS':
      return setContainers(state, action.book)
    case 'SET_ACTIVE_LINE':
      return setActiveLine(state, action.timestamp)
    default:
      return state
  }
}
