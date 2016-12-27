/* globals HTMLAudioElement */

import React, { PropTypes } from 'react';
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
          formatted: line.lineType === 'formatted',
        })}
        onClick={() => lineHandler(audioPlayerElement, line.timestampStart)}
      >
        {(line.content.includes('\n'))
          ? line.content.split('\n').map((piece, i) => (
            <span key={i}>{piece}<br /></span>
          ))
          : line.content
        }
      </a>
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

export default injectSheet(styles)(Line);
