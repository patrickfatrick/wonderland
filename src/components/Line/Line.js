import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';
import seek from '../../utils/seek';
import lineShape from '../../shapes/lineShape';
import styles from './Line.css';

export default function Line({
  audioOn,
  darkmode,
  line,
  activeLineId,
  audioPlayerElement,
  updateAudioTimestamp,
}) {
  const node = useRef();
  // Both seek the player and store the timestamp in the store in case the player is not seekable
  const clickHandler = useCallback(() => {
    seek(audioPlayerElement, line.timestamp[0]);
    updateAudioTimestamp(line.timestamp[0]);
  }, [audioPlayerElement, line.timestamp, updateAudioTimestamp]);

  const { content } = line;
  const isActive = line.id === activeLineId;

  return (
    <span>
      <a // eslint-disable-line jsx-a11y/anchor-is-valid
        href="#"
        tabIndex="0"
        className={
          c({
            [styles.line]: true,
            [styles.lineDarkmodeOn]: darkmode,
            [styles.lineActive]: (!darkmode && isActive && audioOn),
            [styles.lineActiveDarkmodeOn]: (darkmode && isActive && audioOn),
          })
        }
        data-active-line={isActive}
        onClick={clickHandler}
        dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
          __html: content,
        }}
        ref={node}
      />
    </span>
  );
}

Line.propTypes = {
  audioOn: PropTypes.bool.isRequired,
  audioPlayerElement: PropTypes.instanceOf(HTMLAudioElement),
  darkmode: PropTypes.bool.isRequired,
  updateAudioTimestamp: PropTypes.func.isRequired,
  line: lineShape.isRequired,
  activeLineId: PropTypes.string,
};

Line.defaultProps = {
  audioPlayerElement: null,
  activeLineId: null,
};
