import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = {
  imageContainer: {
    textAlign: 'center',
  },
  image: {
    maxWidth: '100%',
  },
};

function Image({
  image,
  imagesLocation,
  sheet: { classes }, // eslint-disable-line react/prop-types
}) {
  return (
    <div className={classes.imageContainer}>
      <img
        alt={image.src}
        className={classes.image}
        {...(image.src && { src: imagesLocation + image.src })}
      />
    </div>
  );
}

Image.propTypes = {
  image: PropTypes.shape({
    type: PropTypes.string,
    src: PropTypes.string,
  }).isRequired,
  imagesLocation: PropTypes.string.isRequired,
};

export default injectSheet(styles)(Image);
