import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Container from './Container';

const styles = {
  backmatter: {
    textAlign: 'center',
    marginBottom: '6rem',
    marginTop: '6rem',
    fontSize: '2.5rem',
  },
};

function BackMatter({
  backmatter,
  imagesLocation,
  sheet: { classes }, // eslint-disable-line react/prop-types
}) {
  return (
    <div className={classes.backmatter}>
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

export default injectSheet(styles)(BackMatter);
