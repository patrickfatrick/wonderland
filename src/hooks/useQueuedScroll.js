import { useState, useEffect } from "react";
import { debounce } from "lodash";
import isSmallScreen from "../utils/isSmallScreen";
import scrollToY from "../utils/scrollToY";

function scrollToEl(container, target, options = {}) {
  const { offset = 0 } = options;
  scrollToY(container, target.offsetTop - (isSmallScreen() ? 75 : 30) - offset, 0.5);
}

export default function (container, target, options = {}) {
  const [scrollingQueued, setScrollingQueued] = useState(false);

  // Debounce this effect so that it will only run once offsetTop becomes static
  useEffect(debounce(() => {
    if (target && scrollingQueued) scrollToEl(container, target, options);
    setScrollingQueued(false);
  }, 250), [container, target, scrollingQueued, setScrollingQueued]);

  return [scrollingQueued, setScrollingQueued];
}
