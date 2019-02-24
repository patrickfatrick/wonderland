import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { debounce } from 'lodash';
import truncate from '../../utils/truncate';
import isSmallScreen from '../../utils/isSmallScreen';
import scrollToY from '../../utils/scrollToY';
import useResizeObserver from '../../hooks/useResizeObserver';
import styles from './ChapterButton.css';

function scrollToEl(el) {
  scrollToY(el.offsetTop - (isSmallScreen() ? 75 : 30), 0.5);
}

export default function ChapterButton({
  chapter,
  index,
  darkmode,
  chapterSelectHandler,
  toggleChapterSelect,
  audioPlayerElement,
}) {
  const [scrollingQueued, setScrollingQueued] = useState(false);
  const { nodeWidth, node } = useResizeObserver();

  // Debounce this effect so that it will only run once offsetTop becomes static
  useEffect(debounce(() => {
    const { el } = chapter;
    if (el?.offsetTop && scrollingQueued) {
      scrollToEl(el);
      setScrollingQueued(false);
    }
  }, 250), [chapter.el, scrollingQueued]);

  const chapterSelectListener = useCallback(() => {
    toggleChapterSelect(false);
    chapterSelectHandler(index, audioPlayerElement, chapter.timestamp);
    setScrollingQueued(true);
  }, [toggleChapterSelect, chapterSelectHandler, index, audioPlayerElement, chapter.timestamp]);

  const { title } = chapter;
  // When hidden, nodeWidth = 0, which can be awkward when being shown
  const chapterSelectHeading = nodeWidth && nodeWidth < 480 ? truncate(title, 18) : title;

  return (
    <li
      key={chapter.id}
      className={classNames(
        styles.chapterHeading,
        styles.chapterHeadingOption,
      )}
      ref={node}
    >
      <button
        type="button"
        className={
          classNames({
            [styles.chapterOptionButton]: true,
            [styles.chapterOptionButtonActive]: chapter.active,
            [styles.chapterOptionButtonDarkmodeOn]: darkmode,
            [styles.chapterOptionButtonActiveDarkmodeOn]: chapter.active
            && darkmode,
          })
        }
        onClick={chapterSelectListener}
      >
        {chapterSelectHeading}
      </button>
    </li>
  );
}

ChapterButton.propTypes = {
  chapter: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    timestamp: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
  darkmode: PropTypes.bool.isRequired,
  chapterSelectHandler: PropTypes.func.isRequired,
  toggleChapterSelect: PropTypes.func.isRequired,
  audioPlayerElement: PropTypes.instanceOf(HTMLAudioElement),
};

ChapterButton.defaultProps = {
  audioPlayerElement: {},
};
