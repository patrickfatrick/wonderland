import React, { useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { throttle } from 'lodash';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import Audio from '../Audio';
import Blocks from '../Blocks';
import NavBar from '../NavBar';
import FrontMatter from '../FrontMatter';
import BackMatter from '../BackMatter';
import styles from './Reader.css';

export default function Reader({
  book,
  darkmode,
  mountBookAndAssets,
  path,
  setActiveChapter,
  renderMore,
  renderIndex,
}) {
  const node = useRef();

  const handleIntersection = useCallback((entries) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    window.requestIdleCallback(renderMore, { timeout: 500 });
  }, [renderMore]);
  const sentinelNode = useIntersectionObserver(handleIntersection, 1);

  useLayoutEffect(() => {
    mountBookAndAssets(path);
  }, [mountBookAndAssets, path]);

  useEffect(() => {
    const handleScroll = throttle(() => setActiveChapter(window.scrollY), 250);
    window.addEventListener('scroll', handleScroll);
    const ro = new ResizeObserver(handleScroll);
    ro.observe(node.current);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      ro.unobserve(node.current);
    };
  }, [setActiveChapter]);

  return (
    <div
      className={
        classNames({
          [styles.readerContainer]: true,
          [styles.readerContainerDarkmodeOn]: darkmode,
        })
      }
      ref={node}
    >
      <Audio />
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
  );
}

Reader.propTypes = {
  book: PropTypes.shape({
    assetsLocation: PropTypes.string,
    audio: PropTypes.shape({ src: PropTypes.string, size: PropTypes.number }),
    chapters: PropTypes.array,
  }).isRequired,
  darkmode: PropTypes.bool.isRequired,
  mountBookAndAssets: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  setActiveChapter: PropTypes.func.isRequired,
  renderMore: PropTypes.func.isRequired,
  renderIndex: PropTypes.number.isRequired,
};
