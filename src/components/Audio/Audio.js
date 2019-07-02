import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './Audio.css';

export default function Audio({
  audioLocation,
  autoscrollOn,
  timeUpdate,
  refPlayer,
  readerContainerElement,
}) {
  const node = useRef();

  useEffect(() => {
    refPlayer(node.current);
  }, [refPlayer]);

  const autoscrollHandler = useCallback(() => {
    if (!autoscrollOn) return;
    const activeLine = readerContainerElement.querySelector('[data-active-line=true]');
    if (!activeLine) return;
    readerContainerElement.scroll(0, activeLine.offsetTop - 200);
  }, [autoscrollOn, readerContainerElement]);

  const onTimeUpdateHandler = useCallback((e) => {
    timeUpdate(e);
    autoscrollHandler();
  }, [timeUpdate, autoscrollHandler]);

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
  autoscrollOn: PropTypes.bool.isRequired,
  timeUpdate: PropTypes.func.isRequired,
  refPlayer: PropTypes.func.isRequired,
  readerContainerElement: PropTypes.instanceOf(HTMLDivElement),
};

Audio.defaultProps = {
  readerContainerElement: null,
};
