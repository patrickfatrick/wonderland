/* globals HTMLAudioElement */

import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import styles from './Controls.css';

function Controls({
  audioOn,
  audio,
  audioPlayerElement,
  autoscroll,
  buffering,
  toggleAudio,
  toggleAutoscroll,
}) {
  return (
    <div
      id="button-container"
      className={styles.buttonContainer}
    >
      <button
        id="control-audio-button"
        title="Control Audio"
        className={classNames(styles.button, {
          disabled: buffering,
        })}
        onClick={() => toggleAudio(audioPlayerElement, !audioOn)}
      >
        {buffering && 'Loading...'}
        {!buffering && ((audioOn) ? 'Pause' : `Play (${Math.round(audio.size / 1000000)} MB)`)}
      </button>
      {(audioOn) &&
        <button
          id="scroll-button"
          title="Auto-Scroll"
          className={styles.button}
          onClick={() => toggleAutoscroll(!autoscroll)}
        >
          {(autoscroll) ? 'Disable' : 'Enable' } Auto-Scroll
        </button>
      }
    </div>
  );
}

Controls.propTypes = {
  audioOn: PropTypes.bool.isRequired,
  audioPlayerElement: PropTypes.instanceOf(HTMLAudioElement),
  autoscroll: PropTypes.bool.isRequired,
  buffering: PropTypes.bool.isRequired,
  toggleAudio: PropTypes.func.isRequired,
  toggleAutoscroll: PropTypes.func.isRequired,
  audio: PropTypes.shape({ src: PropTypes.string, size: PropTypes.number }).isRequired,
};

Controls.defaultProps = {
  audioPlayerElement: {},
};

export default injectSheet(styles)(Controls);
