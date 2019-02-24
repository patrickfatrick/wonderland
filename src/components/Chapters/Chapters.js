import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import truncate from '../../utils/truncate';
import useResizeObserver from '../../hooks/useResizeObserver';
import ChapterButton from '../ChapterButton';
import styles from './Chapters.css';

export default function Chapters({
  chapters,
  chapterOrder,
  darkmode,
  activeChapter,
}) {
  const [toggled, setToggled] = useState(false);
  const { nodeWidth, node } = useResizeObserver();

  const toggle = useCallback(() => {
    setToggled(!toggled);
  }, [toggled]);

  const handleClick = useCallback((e) => {
    e.currentTarget.blur();
    toggle();
  }, [toggle]);

  let heading = 'Select a Chapter';
  if (activeChapter) {
    const { title } = chapters[activeChapter];
    heading = nodeWidth < 480 ? truncate(title, 18) : title;
  }

  return (
    <li
      className={styles.chapterHeading}
      ref={node}
    >
      <button
        type="button"
        onClick={handleClick}
        className={
          classNames({
            [styles.chapterSelectToggle]: true,
            [styles.chapterSelectToggleDarkmodeOn]: darkmode,
          })
        }
      >
        {heading}
      </button>
      <ul
        className={
          classNames({
            [styles.chapterSelect]: true,
            [styles.chapterSelectDarkmodeOn]: darkmode,
            [styles.chapterSelectToggled]: toggled,
          })
        }
      >
        {Object.keys(chapters).length && chapterOrder.map((chapterId, i) => (
          <ChapterButton
            key={chapterId}
            chapter={chapters[chapterId]}
            index={i}
            darkmode={darkmode}
            toggleChapterSelect={toggle}
          />
        ))}
      </ul>
    </li>
  );
}

Chapters.propTypes = {
  chapters: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  chapterOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
  darkmode: PropTypes.bool.isRequired,
  activeChapter: PropTypes.string,
};

Chapters.defaultProps = {
  activeChapter: '',
};
