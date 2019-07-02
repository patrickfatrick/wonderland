import React, { Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';
import seek from '../../utils/seek';
import useQueuedScroll from '../../hooks/useQueuedScroll';
import bookShape from '../../shapes/bookShape';
import chapterShape from '../../shapes/chapterShape';
import lineShape from '../../shapes/lineShape';
import styles from './Intro.css';

export default function Intro({
  book,
  activeChapter,
  activeLine,
  darkmode,
  shouldDisplay,
  toggleShouldDisplay,
  updateAudioTimestamp,
  renderMore,
  readerContainerElement,
  audioPlayerElement,
}) {
  const [scrollingQueued, setScrollingQueued] = useQueuedScroll(
    readerContainerElement,
    activeChapter?.el,
  );

  const resumeButtonHandler = useCallback(() => {
    const timestamp = activeLine?.timestamp[0] ?? activeChapter?.timestamp ?? 0;
    toggleShouldDisplay();
    seek(audioPlayerElement, timestamp);
    updateAudioTimestamp(timestamp);
    renderMore(book.chapters.indexOf(activeChapter?.id));
    setScrollingQueued(!scrollingQueued);
  }, [
    activeLine,
    toggleShouldDisplay,
    audioPlayerElement,
    updateAudioTimestamp,
    renderMore,
    book.chapters,
    activeChapter,
    setScrollingQueued,
    scrollingQueued,
  ]);

  const startButtonHandler = useCallback(() => {
    toggleShouldDisplay();
    window.localStorage.removeItem('activeLine');
    window.localStorage.removeItem('activeChapter');
  }, [toggleShouldDisplay]);

  return (
    <div className={
      c(
        styles.intro,
        {
          [styles.introDarkmodeOn]: darkmode,
          [styles.introHidden]: !shouldDisplay,
        },
      )
    }
    >
      <div className={c(styles.introNote, { [styles.introNoteDarkmodeOn]: darkmode })}>
        <h1 className={styles.introHeader}>Oh, hi.</h1>
        <p className={styles.introText}>
          {`Didn't see you come in. I was just enjoying one of my absolute favorite books,
            ${book.info.title} by ${book.info.author}. Won't you join me?`}
        </p>
        <p className={styles.introText}>
          {`Hit the Play button in the top right to control audio playback,
            and from there you can also enable auto-scroll and night mode.
            Click on any line in the text to jump to it in the audio.
            Select a chapter at the top to jump to it both on the page and in the audio.`}
        </p>
        <h4 className={styles.introSignOff}>Enjoy!</h4>
        <div
          className={styles.buttons}
        >
          {activeChapter || activeLine ? (
            <Fragment>
              <button
                type="button"
                title="Resume"
                className={c('button', styles.button)}
                onClick={resumeButtonHandler}
              >
                Resume
              </button>
              <button
                type="button"
                title="Restart"
                className={c('button', styles.button)}
                onClick={startButtonHandler}
              >
                Restart
              </button>
            </Fragment>
          ) : (
            <button
              type="button"
              title="Start"
              className={c('button', styles.button)}
              onClick={startButtonHandler}
            >
              Start
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

Intro.propTypes = {
  book: bookShape.isRequired,
  activeLine: lineShape,
  activeChapter: chapterShape,
  darkmode: PropTypes.bool.isRequired,
  shouldDisplay: PropTypes.bool.isRequired,
  toggleShouldDisplay: PropTypes.func.isRequired,
  updateAudioTimestamp: PropTypes.func.isRequired,
  renderMore: PropTypes.func.isRequired,
  readerContainerElement: PropTypes.instanceOf(HTMLDivElement),
  audioPlayerElement: PropTypes.instanceOf(HTMLAudioElement),
};

Intro.defaultProps = {
  activeLine: null,
  activeChapter: null,
  readerContainerElement: null,
  audioPlayerElement: null,
};
