import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { isMediumScreen } from '../../lib/utils';
import styles from './Image.css';

export default function Image({
  image: {
    src,
    dimensions,
    thumb,
  },
  imagesLocation,
}) {
  const image = useRef(null);

  const renderActualImage = (entries) => {
    entries.forEach((entry) => {
      const { current: ref } = image;
      if (entry.intersectionRatio < 0.5) return;
      if (ref.src.includes(src)) return;
      ref.src = imagesLocation + src;
    });
  };

  // eslint-disable-next-line react/sort-comp
  const interSectionObserver = new IntersectionObserver(renderActualImage, {
    root: null,
    rootMargin: '0px',
    threshold: [0.5],
  });

  useEffect(() => {
    const { current: ref } = image;
    if (ref) interSectionObserver.observe(ref);
    return () => interSectionObserver.unobserve(ref);
  });

  const minWidth = (isMediumScreen())
    ? '100%'
    : dimensions[0];

  const minHeight = (isMediumScreen())
    ? dimensions[1] / (dimensions[0] / document.body.clientWidth)
    : dimensions[1];

  return (
    <div className={styles.imageContainer}>
      <img
        alt={src}
        className={styles.image}
        style={{ minWidth, minHeight }}
        src={src ? imagesLocation + thumb : null}
        ref={image}
      />
    </div>
  );
}

Image.propTypes = {
  image: PropTypes.shape({
    type: PropTypes.string,
    src: PropTypes.string,
    thumb: PropTypes.string,
  }).isRequired,
  imagesLocation: PropTypes.string.isRequired,
};
