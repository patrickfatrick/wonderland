import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import c from "classnames";
import truncate from "../../utils/truncate";
import useResizeObserver from "../../hooks/useResizeObserver";
import chapterShape from "../../shapes/chapterShape";
import ChapterButton from "../ChapterButton";
import styles from "./Chapters.css";

export default function Chapters({
  chapters,
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

  let heading = "Select a Chapter";
  if (activeChapter) {
    const { title } = activeChapter;
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
          c({
            [styles.chapterSelectToggle]: true,
            [styles.chapterSelectToggleDarkmodeOn]: darkmode,
          })
        }
      >
        {heading}
      </button>
      <ul
        className={
          c({
            [styles.chapterSelect]: true,
            [styles.chapterSelectDarkmodeOn]: darkmode,
            [styles.chapterSelectToggled]: toggled,
          })
        }
      >
        {chapters.map((chapter, i) => (
          <ChapterButton
            key={chapter.id}
            chapter={chapter}
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
  chapters: PropTypes.arrayOf(chapterShape),
  darkmode: PropTypes.bool.isRequired,
  activeChapter: chapterShape,
};

Chapters.defaultProps = {
  activeChapter: null,
  chapters: [],
};
