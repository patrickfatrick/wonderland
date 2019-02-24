import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import seek from '../../utils/seek';
import styles from './Line.css';

export default function Line({
  audioOn,
  darkmode,
  lineId,
  line,
  audioPlayerElement,
  updateAudioTimestamp,
}) {
  // Both seek the player and store the timestamp in the store in case the player is not seekable
  const clickHandler = useCallback(() => {
    seek(audioPlayerElement, line.timestampStart);
    updateAudioTimestamp(line.timestampStart);
  }, [audioPlayerElement, line.timestampStart]);

  return (
    <span>
      <a
        href={`#${lineId}`}
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
        onClick={clickHandler}
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
  lineId: PropTypes.string.isRequired,
  updateAudioTimestamp: PropTypes.func.isRequired,
  line: PropTypes.shape({
    active: PropTypes.bool,
    content: PropTypes.string,
    timestampStart: PropTypes.number,
    timestampEnd: PropTypes.number,
  }).isRequired,
};

Line.defaultProps = {
  audioPlayerElement: {},
};
