import { useEffect, useRef } from 'react';

export default function (callback, threshold = 0) {
  const node = useRef();
  useEffect(() => {
    const io = new IntersectionObserver(
      callback,
      {
        root: null,
        rootMargin: '0px',
        threshold: [threshold],
      },
    );
    io.observe(node.current);
    return () => io.unobserve(node.current);
  }, []);

  return node;
}
