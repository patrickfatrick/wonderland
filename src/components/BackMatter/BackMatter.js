import React from 'react';
import PropTypes from 'prop-types';
import Block from '../Block';
import styles from './BackMatter.css';

export default function BackMatter({
  backmatter,
}) {
  return (
    <div className={styles.backmatter}>
      {backmatter.map(block => (
        <Block
          key={block.id}
          block={block}
        />
      ))}
    </div>
  );
}

BackMatter.propTypes = {
  backmatter: PropTypes.arrayOf(PropTypes.object).isRequired,
};
