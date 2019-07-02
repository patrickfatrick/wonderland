import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Block from '../Block';

export default function Blocks({
  renderedBlocks,
  refChapterHeading,
}) {
  return (
    <Fragment>
      {renderedBlocks.map(pageItem => (
        <Block
          key={pageItem.id}
          block={pageItem}
          refChapterHeading={refChapterHeading}
        />
      ))}
    </Fragment>
  );
}

Blocks.propTypes = {
  renderedBlocks: PropTypes.arrayOf(PropTypes.object).isRequired,
  refChapterHeading: PropTypes.func.isRequired,
};
