import { useEffect, useRef } from "react";

export default function (callback, threshold = 0) {
  const node = useRef();
  useEffect(() => {
    const ref = node.current;
    const io = new IntersectionObserver(
      callback,
      {
        root: null,
        rootMargin: "0px",
        threshold,
      },
    );
    io.observe(ref);
    return () => io.unobserve(ref);
  }, [callback, threshold]);

  return node;
}
