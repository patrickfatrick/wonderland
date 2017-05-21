import React from 'react';
import PropTypes from 'prop-types';
import Container from '../Container';
import styles from './BackMatter.css';

export default function BackMatter({
  backmatter,
  imagesLocation,
}) {
  return (
    <div className={styles.backmatter}>
      {backmatter.map(container => (
        <Container
          key={container.id}
          imagesLocation={imagesLocation}
          container={container}
        />
      ))}
    </div>
  );
}

BackMatter.propTypes = {
  imagesLocation: PropTypes.string.isRequired,
  backmatter: PropTypes.arrayOf(PropTypes.object).isRequired,
};
