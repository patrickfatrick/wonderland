import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Block from '../Block';

export default function Blocks({
  pageItems,
  refBookViewer,
  refChapterHeading,
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
          refChapterHeading={refChapterHeading}
        />
      ))}
    </div>
  );
}

Blocks.propTypes = {
  pageItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  refBookViewer: PropTypes.func.isRequired,
  refChapterHeading: PropTypes.func.isRequired,
};
