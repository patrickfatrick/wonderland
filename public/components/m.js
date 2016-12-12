export default function (...args) {
  let styles = {}
  for (let i in args) {
    if (args[i]) {
      Object.assign(styles, args[i])
    }
  }
  return styles
}
