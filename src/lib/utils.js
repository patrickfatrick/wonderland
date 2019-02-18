// Helper function to truncate text for small screens
export function truncate(string = '', num) {
  return string.length >= num ? `${string.substring(0, num)}...` : string;
}

export function isSmallScreen() {
  return document.body.clientWidth <= 480;
}

export function isMediumScreen() {
  return document.body.clientWidth <= 600;
}

// See https://github.com/danro/easing-js/blob/master/easing.js
function easeInOutQuint(pos) {
  if ((pos) < 1) {
    return 0.5 * (pos ** 5);
  }
  return 0.5 * (((pos - 2) ** 5) + 2);
}

// Adapted from http://stackoverflow.com/questions/12199363/scrollto-with-animation
export function scrollToY(scrollTargetY = 0, time = 0.5) {
  let currentTime = 0;

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
