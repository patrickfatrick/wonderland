/* globals window document */

// Helper function to truncate text for small screens
export function truncate(string = '', num) {
  return string.length >= num ? `${string.substring(0, num)}...` : string;
}

export function isSmallScreen() {
  return document.body.clientWidth <= 480;
}

// See https://github.com/danro/easing-js/blob/master/easing.js
function easeInOutQuint(pos) {
  if ((pos) < 1) {
    return 0.5 * (pos ** 5);
  }
  return 0.5 * (((pos - 2) ** 5) + 2);
}

// See http://stackoverflow.com/questions/12199363/scrollto-with-animation
export function scrollToY(scrollTargetY = 0, speed = 2000) {
  let currentTime = 0;

  // min time .1, max time .8 seconds
  const time = Math.max(
    0.1,
    Math.min(Math.abs(window.scrollY - scrollTargetY) / speed, 0.8),
  );

  // add animation loop
  function tick() {
    currentTime += 1 / 60;
    const p = currentTime / time / 0.5;

    if (p < 1) {
      window.requestAnimationFrame(tick);
      window.scrollTo(
        0,
        window.scrollY + ((scrollTargetY - window.scrollY) * easeInOutQuint(p)),
      );
    } else {
      window.scrollTo(0, scrollTargetY);
    }
  }

  // call it once to get started
  tick();
}
