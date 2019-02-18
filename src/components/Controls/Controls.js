/* globals HTMLAudioElement */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Controls.css';

export default function Controls({
  audioOn,
  audio,
  audioPlayerElement,
  autoscroll,
  buffering,
  darkmode,
  toggleAudio,
  toggleAutoscroll,
  toggleDarkmode,
}) {
  return (
    <div
      id="button-container"
      className={styles.buttonContainer}
    >
      <button
        type="button"
        title="Darkmode"
        className={
          classNames({
            [styles.button]: true,
            [styles.darkmodeButton]: true,
            [styles.darkmodeButtonDarkmodeOn]: darkmode,
          })
        }
        onClick={e => toggleDarkmode(e, !darkmode)}
      />
      <button
        type="button"
        title="Control Audio"
        className={
          classNames({
            [styles.button]: true,
            [styles.buttonDisabled]: buffering,
            [styles.buttonDarkmodeOn]: darkmode,
          })
        }
        onClick={e => toggleAudio(e, audioPlayerElement, !audioOn)}
      >
        {buffering && 'Loading...'}
        {!buffering && ((audioOn) ? 'Pause' : `Play (${Math.round(audio.size / 1000000)} MB)`)}
      </button>
      {(audioOn)
        && (
        <button
          type="button"
          title="Auto-Scroll"
          className={
            classNames({
              [styles.button]: true,
              [styles.buttonDarkmodeOn]: darkmode,
            })
          }
          onClick={e => toggleAutoscroll(e, !autoscroll)}
        >
           Autoscroll
          {' '}
          {(autoscroll) ? 'Off' : 'On'}
        </button>
        )
      }
    </div>
  );
}

Controls.propTypes = {
  audioOn: PropTypes.bool.isRequired,
  audioPlayerElement: PropTypes.instanceOf(HTMLAudioElement),
  autoscroll: PropTypes.bool.isRequired,
  buffering: PropTypes.bool.isRequired,
  darkmode: PropTypes.bool.isRequired,
  toggleAudio: PropTypes.func.isRequired,
  toggleAutoscroll: PropTypes.func.isRequired,
  toggleDarkmode: PropTypes.func.isRequired,
  audio: PropTypes.shape({ src: PropTypes.string, size: PropTypes.number }).isRequired,
};

Controls.defaultProps = {
  audioPlayerElement: {},
};
