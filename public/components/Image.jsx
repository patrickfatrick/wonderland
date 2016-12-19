import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';

const styles = {
  image: {
    width: '100%',
  },
};

function Image({
  image,
  imagesLocation,
  sheet: { classes }, // eslint-disable-line react/prop-types
}) {
  return (
    <img
      alt={image.src}
      className={classes.image}
      {...(image.src && { src: imagesLocation + image.src })}
    />
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
