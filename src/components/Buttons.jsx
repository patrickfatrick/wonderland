/* globals HTMLAudioElement */

import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import classNames from 'classnames';

const styles = {
  buttonContainer: {
    textAlign: 'center',
    display: 'inline-block',
    position: 'absolute',
    right: '0.5rem',
    top: '0',
    paddingTop: '23px',
    height: '75px',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    '@media (min-width: 768px)': {
      right: '30px',
    },
  },
  button: {
    outline: 'none',
    marginLeft: '3px',
    marginRight: '3px',
    fontSize: '0.8rem',
    lineHeight: '0.8rem',
    border: '1px solid #919191',
    padding: '0.5rem 1rem 0.5rem 1rem',
    minWidth: '1.5rem',
    minHeight: '1.5rem',
    textAlign: 'center',
    backgroundColor: 'white',
    color: '#666',
    borderRadius: '4px',
    '&:active': {
      backgroundColor: '#c1c1c1',
    },
    '&.disabled': {
      backgroundColor: '#c1c1c1',
    },
  },
};

function Buttons({
  audioOn,
  audioPlayerElement,
  autoscroll,
  buffering,
  toggleAudio,
  toggleAutoscroll,
  sheet: { classes }, // eslint-disable-line react/prop-types
}) {
  return (
    <div
      id="button-container"
      className={classes.buttonContainer}
    >
      <button
        id="control-audio-button"
        title="Control Audio"
        className={classNames(classes.button, {
          disabled: buffering,
        })}
        onClick={() => toggleAudio(audioPlayerElement, !audioOn)}
      >
        {buffering && 'Loading...'}
        {!buffering && ((audioOn) ? 'Pause' : 'Play')}
      </button>
      {(audioOn) &&
        <button
          id="scroll-button"
          title="Auto-Scroll"
          className={classes.button}
          onClick={() => toggleAutoscroll(!autoscroll)}
        >
          {(autoscroll) ? 'Disable' : 'Enable' } Auto-Scroll
        </button>
      }
    </div>
  );
}

Buttons.propTypes = {
  audioOn: PropTypes.bool.isRequired,
  audioPlayerElement: PropTypes.instanceOf(HTMLAudioElement),
  autoscroll: PropTypes.bool.isRequired,
  buffering: PropTypes.bool.isRequired,
  toggleAudio: PropTypes.func.isRequired,
  toggleAutoscroll: PropTypes.func.isRequired,
};

export default injectSheet(styles)(Buttons);
