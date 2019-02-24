import React, { useRef, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { throttle } from 'lodash';
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
  scrollHandler,
  renderIndex,
}) {
  const node = useRef();

  useLayoutEffect(() => {
    mountBookAndAssets(path);
  }, []);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollPos = window.scrollY;
      const offset = document.body.clientHeight - window.innerHeight;
      scrollHandler(scrollPos, offset);
    }, 100);
    window.addEventListener('scroll', handleScroll);
    const ro = new ResizeObserver(handleScroll);
    ro.observe(node.current);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      ro.unobserve(node.current);
    };
  }, []);

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
  scrollHandler: PropTypes.func.isRequired,
  renderIndex: PropTypes.number.isRequired,
};
