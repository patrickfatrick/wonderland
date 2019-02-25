import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import useResizeObserver from '../../hooks/useResizeObserver';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import styles from './Image.css';

export default function Image({
  image,
  imagesLocation,
}) {
  const { nodeWidth, node } = useResizeObserver();

  const renderFullSizeImage = useCallback((entries) => {
    const [entry] = entries;
    const { src } = image;
    if (!entry.isIntersecting) return;
    if (entry.target.src.includes(src)) return;
    entry.target.src = imagesLocation + src;
  }, [image, imagesLocation]);

  const imageNode = useIntersectionObserver(renderFullSizeImage, [0.25, 0.5, 0.75, 1]);

  const { dimensions } = image;
  const minHeight = nodeWidth < 600
    ? dimensions[1] / (dimensions[0] / document.body.clientWidth)
    : dimensions[1];
  const width = nodeWidth < 600 ? '100%' : dimensions[0];
  const imageStyles = { minHeight, width };

  return (
    <div
      className={styles.imageContainer}
      ref={node}
    >
      <img
        alt={image.src}
        className={styles.image}
        style={imageStyles}
        src={image.src ? imagesLocation + image.thumb : null}
        ref={imageNode}
      />
    </div>
  );
}

Image.propTypes = {
  image: PropTypes.shape({
    type: PropTypes.string,
    src: PropTypes.string,
    dimensions: PropTypes.arrayOf(PropTypes.number),
    thumb: PropTypes.string,
  }).isRequired,
  imagesLocation: PropTypes.string.isRequired,
};
