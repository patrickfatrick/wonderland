import React from 'react';
import Block from '../Block';
import backmatterShape from '../../shapes/backmatterShape';
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
  backmatter: backmatterShape.isRequired,
};
