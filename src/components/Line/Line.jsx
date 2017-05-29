/* globals HTMLAudioElement */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Line.css';

export default function Line({
  audioOn,
  darkmode,
  line,
  lineHandler,
  audioPlayerElement, // eslint-disable-line react/prop-types
}) {
  return (
    <span>
      <a
        href={`#${line.id}`}
        tabIndex="0"
        className={
          classNames({
            [styles.line]: true,
            [styles.lineDarkmodeOn]: darkmode,
            [styles.lineActive]: (!darkmode && line.active && audioOn),
            [styles.lineActiveDarkmodeOn]: (darkmode && line.active && audioOn),
          })
        }
        data-active-line={line.active && audioOn}
        onClick={e => lineHandler(e, audioPlayerElement, line.timestampStart)}
        // This is fine as the html would be generated in the server
        dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
          __html: line.content,
        }}
      />
    </span>
  );
}

Line.propTypes = {
  audioOn: PropTypes.bool.isRequired,
  audioPlayerElement: PropTypes.instanceOf(HTMLAudioElement),
  darkmode: PropTypes.bool.isRequired,
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