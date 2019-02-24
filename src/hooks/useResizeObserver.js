import { useState, useEffect, useRef } from 'react';
import { debounce } from 'lodash';

export default function (debounceThreshold = 100) {
  const [nodeWidth, setNodeWidth] = useState(0);
  const node = useRef();

  useEffect(() => {
    const ro = new ResizeObserver(debounce((entries) => {
      const { width } = entries[0].contentRect;
      setNodeWidth(width);
    }, debounceThreshold));
    ro.observe(node.current);
    return () => ro.unobserve(node.current);
  }, []);

  return {
    nodeWidth,
    node,
  };
}
