import initialState from './initial-state'

export default function (state = initialState.containers, action) {
  function renderContainers (state, book) {
    const containers = []
    const chapterIndex = state.length
      ? state[state.length - 1].chapterId + 1
      : 0
    if (chapterIndex === book.chapters.length) return state
    book.chapters[chapterIndex].containers.forEach((container, containerIndex) => {
      if (container.type === 'paragraph') {
        containers.push(...container.lines.map((line) => {
          return { ...line, active: false, containerId: containerIndex, chapterId: chapterIndex }
        }))
      } else {
        containers.push({ ...container, containerId: containerIndex, chapterId: chapterIndex })
      }
    })
    return [...state, ...containers]
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
    case 'RENDER_CONTAINERS':
      return renderContainers(state, action.book)
    case 'SET_ACTIVE_LINE':
      return setActiveLine(state, action.timestamp)
    default:
      return state
  }
}
