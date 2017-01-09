import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Container from './Container';

const styles = {
  frontmatter: {
    textAlign: 'center',
    marginBottom: '6rem',
  },
  title: {
    fontSize: '2.5rem',
    marginTop: '12rem',
  },
  author: {
    fontSize: '1.4rem',
    marginBottom: '6rem',
  },
};

function FrontMatter({
  imagesLocation,
  info,
  frontmatter,
  sheet: { classes }, // eslint-disable-line react/prop-types
}) {
  return (
    <div className={classes.frontmatter}>
      <div className={classes.title}>
        {info.title}
      </div>
      <div className={classes.author}>
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

export default injectSheet(styles)(FrontMatter);
