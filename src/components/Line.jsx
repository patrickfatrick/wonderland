/* globals HTMLAudioElement */

import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classNames from 'classnames';

const styles = {
  whitespace: {
    paddingLeft: '0.1rem',
    paddingRight: '0.2rem',
  },
  line: {
    color: '#000',
    textDecoration: 'none',
    cursor: 'pointer',
    '&.formatted': {
      fontStyle: 'italic',
      marginTop: '1rem',
    },
    '&:focus, :active': {
      backgroundColor: '#c1c1c1',
      border: 'none',
      outline: 'none',
    },
    '&:visited': {
      color: 'inherit',
    },
    '&.active': {
      backgroundColor: '#FFCC66 !important',
    },
  },
};

function Line({
  audioOn,
  line,
  lineHandler,
  audioPlayerElement, // eslint-disable-line react/prop-types
  sheet: { classes }, // eslint-disable-line react/prop-types
}) {
  return (
    <span>
      <a
        href={`#${line.id}`}
        tabIndex="0"
        className={classNames(classes.line, {
          active: (line.active && audioOn),
        })}
        onClick={e => lineHandler(e, audioPlayerElement, line.timestampStart)}
        // This is fine as the html would be generated in the server
        dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
          __html: line.content,
        }}
      />
      <span
        className={classes.whitespace}
      />
    </span>
  );
}

Line.propTypes = {
  audioOn: PropTypes.bool.isRequired,
  audioPlayerElement: PropTypes.instanceOf(HTMLAudioElement),
  line: PropTypes.shape({
    active: PropTypes.bool,
    content: PropTypes.string,
    timestampStart: PropTypes.number,
    timestampEnd: PropTypes.number,
  }).isRequired,
  lineHandler: PropTypes.func.isRequired,
};

Line.defaultProps = {
  audioPlayerElement: {},
};

export default injectSheet(styles)(Line);
