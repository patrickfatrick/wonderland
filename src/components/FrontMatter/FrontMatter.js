import React from 'react';
import PropTypes from 'prop-types';
import Block from '../Block';
import styles from './FrontMatter.css';

export default function FrontMatter({
  info,
  frontmatter,
}) {
  return (
    <div className={styles.frontmatter}>
      <div className={styles.title}>
        {info.title}
      </div>
      <div className={styles.author}>
        {info.author}
      </div>
      {frontmatter.map(block => (
        <Block
          key={block.id}
          block={block}
        />
      ))}
    </div>
  );
}

FrontMatter.propTypes = {
  info: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
  }).isRequired,
  frontmatter: PropTypes.arrayOf(PropTypes.object).isRequired,
};
