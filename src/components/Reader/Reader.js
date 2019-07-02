import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';
import { throttle } from 'lodash';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import Intro from '../Intro';
import Audio from '../Audio';
import Blocks from '../Blocks';
import NavBar from '../NavBar';
import FrontMatter from '../FrontMatter';
import BackMatter from '../BackMatter';
import bookShape from '../../shapes/bookShape';
import styles from './Reader.css';

export default function Reader({
  book,
  darkmode,
  mountBookAndAssets,
  bookId,
  setActiveChapter,
  refReaderContainer,
  renderMore,
  renderIndex,
}) {
  const node = useRef();
  const [shouldDisplayIntro, setShouldDisplayIntro] = useState(true);

  const toggleShouldDisplayIntro = useCallback(() => {
    setShouldDisplayIntro(!shouldDisplayIntro);
  }, [shouldDisplayIntro, setShouldDisplayIntro]);

  const handleIntersection = useCallback((entries) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    window.requestIdleCallback(renderMore, { timeout: 500 });
  }, [renderMore]);
  const sentinelNode = useIntersectionObserver(handleIntersection, 1);

  useEffect(() => {
    mountBookAndAssets(bookId);
  }, [mountBookAndAssets, bookId]);

  useEffect(() => {
    refReaderContainer(node.current);
  }, [refReaderContainer]);

  useEffect(() => {
    const ref = node.current;
    const handleScroll = throttle(() => {
      if (!shouldDisplayIntro) setActiveChapter(ref.scrollTop);
    }, 250);
    ref.addEventListener('scroll', handleScroll);
    const ro = new ResizeObserver(handleScroll);
    ro.observe(ref);
    return () => {
      ref.removeEventListener('scroll', handleScroll);
      ro.unobserve(ref);
    };
  }, [setActiveChapter, shouldDisplayIntro]);

  return (
    <div className={c(styles.container, { [styles.containerDarkmodeOn]: darkmode })}>
      <Intro
        toggleShouldDisplay={toggleShouldDisplayIntro}
        shouldDisplay={shouldDisplayIntro}
      />
      <div className={c(styles.overlay, { [styles.overlayHidden]: !shouldDisplayIntro })}>
        <div
          className={c(styles.readerContainer, { [styles.readerContainerDarkmodeOn]: darkmode })}
          ref={node}
        >
          {book.audio.src && <Audio />}
          <NavBar />
          <div
            className={styles.reader}
          >
            <FrontMatter />
            <Blocks />
            <div className="sentinel" ref={sentinelNode} />
            {renderIndex >= book.chapters.length - 1 && <BackMatter />}
          </div>
        </div>
      </div>
    </div>
  );
}

Reader.propTypes = {
  book: bookShape.isRequired,
  darkmode: PropTypes.bool.isRequired,
  mountBookAndAssets: PropTypes.func.isRequired,
  bookId: PropTypes.string.isRequired,
  setActiveChapter: PropTypes.func.isRequired,
  refReaderContainer: PropTypes.func.isRequired,
  renderMore: PropTypes.func.isRequired,
  renderIndex: PropTypes.number.isRequired,
};
