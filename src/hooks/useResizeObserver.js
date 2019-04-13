import { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";

export default function (debounceThreshold = 100) {
  const [nodeWidth, setNodeWidth] = useState(0);
  const node = useRef();

  useEffect(() => {
    const ref = node.current;
    const ro = new ResizeObserver(debounce((entries) => {
      const { width } = entries[0].contentRect;
      setNodeWidth(width);
    }, debounceThreshold));
    ro.observe(ref);
    return () => ro.unobserve(ref);
  }, [debounceThreshold]);

  return {
    nodeWidth,
    node,
  };
}
