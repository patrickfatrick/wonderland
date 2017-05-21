import React from 'react';
import PropTypes from 'prop-types';
import Container from '../Container';
import styles from './FrontMatter.css';

export default function FrontMatter({
  imagesLocation,
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
      {frontmatter.map(container => (
        <Container
          key={container.id}
          container={container}
          imagesLocation={imagesLocation}
        />
      ))}
    </div>
  );
}

FrontMatter.propTypes = {
  imagesLocation: PropTypes.string.isRequired,
  info: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
  }).isRequired,
  frontmatter: PropTypes.arrayOf(PropTypes.object).isRequired,
};
