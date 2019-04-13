import React, { useCallback } from "react";
import PropTypes from "prop-types";
import c from "classnames";
import useQueuedScroll from "../../hooks/useQueuedScroll";
import styles from "./Controls.css";

export default function Controls({
  audioOn,
  autoscrollOn,
  audio,
  audioPlayerElement,
  readerContainerElement,
  buffering,
  darkmode,
  toggleAudio,
  toggleAutoscroll,
  toggleDarkmode,
}) {
  const activeLineElement = document.querySelector("[data-active-line=true]");

  const [scrollingQueued, setScrollingQueued] = useQueuedScroll(
    readerContainerElement,
    activeLineElement,
    { offset: 200 },
  );

  const darkModeClickHandler = useCallback((e) => {
    e.currentTarget.blur();
    toggleDarkmode(!darkmode);
  }, [toggleDarkmode, darkmode]);

  const audioClickHandler = useCallback((e) => {
    e.currentTarget.blur();
    if (!audioOn && !autoscrollOn) setScrollingQueued(!scrollingQueued);
    toggleAudio(audioPlayerElement, !audioOn);
  }, [toggleAudio, audioPlayerElement, audioOn, autoscrollOn, setScrollingQueued, scrollingQueued]);

  const autoscrollClickHandler = useCallback((e) => {
    e.currentTarget.blur();
    toggleAutoscroll(!autoscrollOn);
  }, [toggleAutoscroll, autoscrollOn]);

  return (
    <li
      id="button-container"
      className={styles.buttonContainer}
    >
      <button
        type="button"
        title="Toggle Darkmode"
        className={
          c({
            [styles.button]: true,
            [styles.darkmodeButton]: true,
            [styles.darkmodeButtonDarkmodeOn]: darkmode,
          })
        }
        onClick={darkModeClickHandler}
      >
        D
      </button>
      <button
        type="button"
        title="Toggle Audio"
        className={
          c({
            [styles.button]: true,
            [styles.buttonDisabled]: buffering,
            [styles.buttonDarkmodeOn]: darkmode,
          })
        }
        onClick={audioClickHandler}
      >
        {buffering && "Loading..."}
        {!buffering && ((audioOn) ? "Pause" : `Play (${Math.round(audio.size / 1000000)} MB)`)}
      </button>
      {(audioOn)
        && (
        <button
          type="button"
          title="Toggle Auto-Scroll"
          className={
            c({
              [styles.button]: true,
              [styles.buttonDarkmodeOn]: darkmode,
            })
          }
          onClick={autoscrollClickHandler}
        >
           Autoscroll
          {" "}
          {(autoscrollOn) ? "Off" : "On"}
        </button>
        )
      }
    </li>
  );
}

Controls.propTypes = {
  audioOn: PropTypes.bool.isRequired,
  readerContainerElement: PropTypes.instanceOf(HTMLDivElement),
  audioPlayerElement: PropTypes.instanceOf(HTMLAudioElement),
  autoscrollOn: PropTypes.bool.isRequired,
  buffering: PropTypes.bool.isRequired,
  darkmode: PropTypes.bool.isRequired,
  toggleAudio: PropTypes.func.isRequired,
  toggleAutoscroll: PropTypes.func.isRequired,
  toggleDarkmode: PropTypes.func.isRequired,
  audio: PropTypes.shape({ src: PropTypes.string, size: PropTypes.number }).isRequired,
};

Controls.defaultProps = {
  readerContainerElement: null,
  audioPlayerElement: null,
};
