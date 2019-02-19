import { throttle } from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Audio from '../Audio';
import Blocks from '../Blocks';
import NavBar from '../NavBar';
import FrontMatter from '../FrontMatter';
import BackMatter from '../BackMatter';
import styles from './Reader.css';

export default class Reader extends Component {
  componentDidMount() {
    const { path, mountBookAndAssets } = this.props;
    mountBookAndAssets(path);
    window.addEventListener('scroll', this.userScrollHandlerThrottled);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.userScrollHandlerThrottled);
  }

  userScrollHandler = () => {
    const { scrollHandler } = this.props;
    const scrollPos = window.scrollY;
    const offset = document.body.clientHeight - window.innerHeight;
    scrollHandler(scrollPos, offset);
  };

  // eslint-disable-next-line react/sort-comp
  userScrollHandlerThrottled = throttle(this.userScrollHandler, 50);

  render() {
    const {
      book,
      darkmode,
      renderIndex,
    } = this.props;

    return (
      <div
        className={
          classNames({
            [styles.readerContainer]: true,
            [styles.readerContainerDarkmodeOn]: darkmode,
          })
        }
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
}

Reader.propTypes = {
  book: PropTypes.shape({
    assetsLocation: PropTypes.string,
    audio: PropTypes.shape({ src: PropTypes.string, size: PropTypes.number }),
    chapters: PropTypes.array,
  }).isRequired,
  darkmode: PropTypes.bool.isRequired,
  info: PropTypes.shape({
    author: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  mountBookAndAssets: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  scrollHandler: PropTypes.func.isRequired,
  renderIndex: PropTypes.number.isRequired,
};
