import easeInOutQuint from './easeInOutQuint';

// Adapted from http://stackoverflow.com/questions/12199363/scrollto-with-animation
export default function scrollToY(scrollElement, scrollTargetY = 0, time = 0.5) {
  let currentTime = 0;

  // add animation loop
  function tick() {
    currentTime += 1 / 60;
    const p = currentTime / time / 0.5;

    if (p < 1) {
      window.requestAnimationFrame(tick);
      scrollElement.scrollTo(
        0,
        scrollElement.scrollTop + ((scrollTargetY - scrollElement.scrollTop) * easeInOutQuint(p)),
      );
    } else {
      scrollElement.scrollTo(0, scrollTargetY);
    }
  }

  // call it once to get started
  tick();
}
