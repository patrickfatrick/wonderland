import React, { useCallback } from "react";
import PropTypes from "prop-types";
import c from "classnames";
import truncate from "../../utils/truncate";
import seek from "../../utils/seek";
import useResizeObserver from "../../hooks/useResizeObserver";
import useQueuedScroll from "../../hooks/useQueuedScroll";
import chapterShape from "../../shapes/chapterShape";
import styles from "./ChapterButton.css";

export default function ChapterButton({
  chapter,
  index,
  darkmode,
  renderMore,
  updateAudioTimestamp,
  toggleChapterSelect,
  readerContainerElement,
  audioPlayerElement,
}) {
  const [scrollingQueued, setScrollingQueued] = useQueuedScroll(
    readerContainerElement,
    chapter.el,
  );
  const { nodeWidth, node } = useResizeObserver();

  // Both seek the player and store the timestamp in the store in case the player is not seekable
  const clickHandler = useCallback(() => {
    toggleChapterSelect(false);
    seek(audioPlayerElement, chapter.timestamp);
    updateAudioTimestamp(chapter.timestamp);
    renderMore(index);
    setScrollingQueued(!scrollingQueued);
  }, [
    updateAudioTimestamp,
    toggleChapterSelect,
    renderMore,
    index,
    audioPlayerElement,
    chapter.timestamp,
    scrollingQueued,
    setScrollingQueued,
  ]);

  const { id, title, active } = chapter;
  // When hidden, nodeWidth = 0, which can be awkward when being shown
  const chapterSelectHeading = nodeWidth && nodeWidth < 480 ? truncate(title, 18) : title;

  return (
    <li
      key={id}
      className={c(
        styles.chapterHeading,
        styles.chapterHeadingOption,
      )}
      ref={node}
    >
      <button
        type="button"
        className={
          c({
            [styles.chapterOptionButton]: true,
            [styles.chapterOptionButtonActive]: active,
            [styles.chapterOptionButtonDarkmodeOn]: darkmode,
            [styles.chapterOptionButtonActiveDarkmodeOn]: active
            && darkmode,
          })
        }
        onClick={clickHandler}
      >
        {chapterSelectHeading}
      </button>
    </li>
  );
}

ChapterButton.propTypes = {
  chapter: chapterShape.isRequired,
  index: PropTypes.number.isRequired,
  darkmode: PropTypes.bool.isRequired,
  renderMore: PropTypes.func.isRequired,
  updateAudioTimestamp: PropTypes.func.isRequired,
  toggleChapterSelect: PropTypes.func.isRequired,
  readerContainerElement: PropTypes.instanceOf(HTMLDivElement),
  audioPlayerElement: PropTypes.instanceOf(HTMLAudioElement),
};

ChapterButton.defaultProps = {
  readerContainerElement: null,
  audioPlayerElement: null,
};
