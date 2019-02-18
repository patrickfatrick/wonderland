import React from 'react';
import PropTypes from 'prop-types';
import Block from '../Block';
import styles from './BackMatter.css';

export default function BackMatter({
  backmatter,
  imagesLocation,
}) {
  return (
    <div className={styles.backmatter}>
      {backmatter.map(block => (
        <Block
          key={block.id}
          imagesLocation={imagesLocation}
          block={block}
        />
      ))}
    </div>
  );
}

BackMatter.propTypes = {
  imagesLocation: PropTypes.string.isRequired,
  backmatter: PropTypes.arrayOf(PropTypes.object).isRequired,
};
