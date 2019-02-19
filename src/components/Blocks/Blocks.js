import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Block from '../Block';

export default function Blocks({
  imagesLocation,
  pageItems,
  refBookViewer,
  refChapterHeading,
  seek,
}) {
  const bookViewerElement = useRef();

  useEffect(() => {
    const { current: ref } = bookViewerElement;
    if (ref) refBookViewer(ref);
  }, []);

  return (
    <div
      ref={bookViewerElement}
    >
      {pageItems.map(pageItem => (
        <Block
          key={pageItem.id}
          block={pageItem}
          seek={seek}
          imagesLocation={imagesLocation}
          refChapterHeading={refChapterHeading}
        />
      ))}
    </div>
  );
}

Blocks.propTypes = {
  imagesLocation: PropTypes.string.isRequired,
  pageItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  refBookViewer: PropTypes.func.isRequired,
  refChapterHeading: PropTypes.func.isRequired,
  seek: PropTypes.func.isRequired,
};
