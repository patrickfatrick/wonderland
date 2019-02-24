// See https://github.com/danro/easing-js/blob/master/easing.js
export default function easeInOutQuint(pos) {
  if ((pos) < 1) {
    return 0.5 * (pos ** 5);
  }
  return 0.5 * (((pos - 2) ** 5) + 2);
}
