import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './Audio.css';

export default function Audio({
  audioLocation,
  autoscroll,
  timeUpdate,
  bookViewerElement,
  refPlayer,
}) {
  const node = useRef();

  useEffect(() => {
    refPlayer(node.current);
  }, []);

  const autoscrollHandler = useCallback(() => {
    if (!autoscroll) return;
    const activeLine = bookViewerElement.querySelector('[data-active-line=true]');
    if (!activeLine) return;
    window.scroll(0, activeLine.offsetTop - 200);
  }, [bookViewerElement, autoscroll]);

  const onTimeUpdateHandler = useCallback((e) => {
    timeUpdate(e, bookViewerElement, autoscroll);
    autoscrollHandler();
  }, [timeUpdate, bookViewerElement, autoscroll, autoscrollHandler]);

  return (
    <div
      className={styles.audioContainer}
    >
      <audio // eslint-disable-line jsx-a11y/media-has-caption
        preload="metadata"
        type="audio/mp4"
        src={audioLocation}
        onTimeUpdate={onTimeUpdateHandler}
        ref={node}
      />
    </div>
  );
}

Audio.propTypes = {
  audioLocation: PropTypes.string.isRequired,
  autoscroll: PropTypes.bool.isRequired,
  timeUpdate: PropTypes.func.isRequired,
  bookViewerElement: PropTypes.instanceOf(HTMLDivElement),
  refPlayer: PropTypes.func.isRequired,
};

Audio.defaultProps = {
  bookViewerElement: {},
};
