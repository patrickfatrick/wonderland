import { throttle } from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Blocks from '../Blocks';
import NavBar from '../NavBar';
import FrontMatter from '../FrontMatter';
import BackMatter from '../BackMatter';
import styles from './Reader.css';

export default class Reader extends Component {
  componentDidMount() {
    const { refPlayer, path, mountBookAndAssets } = this.props;
    mountBookAndAssets(path);
    refPlayer(this.player);
    window.addEventListener('scroll', this.scrollHandlerThrottled);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandlerThrottled);
  }

  scrollHandler = () => {
    const { scrollHandler } = this.props;
    scrollHandler({
      scrollPos: window.scrollY,
      offset: document.body.clientHeight - window.innerHeight,
    });
  }

  // eslint-disable-next-line react/sort-comp
  scrollHandlerThrottled = throttle(this.scrollHandler, 50);

  render() {
    const {
      book,
      darkmode,
      assetsLocation,
      imagesLocation,
      bookViewerElement,
      autoscroll,
      info,
      frontmatter,
      backmatter,
      seek,
      timeUpdate,
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
        <div
          className={styles.audioContainer}
        >
          <audio // eslint-disable-line jsx-a11y/media-has-caption
            preload="metadata"
            type="audio/mp4"
            {...(book.audio.src && { src: `${assetsLocation}audio/${book.audio.src}` })}
            onTimeUpdate={(e) => {
              timeUpdate(e, bookViewerElement, autoscroll);
            }}
            ref={(node) => {
              this.player = node;
            }}
          />
        </div>
        <NavBar
          info={info}
          seek={seek}
          darkmode={darkmode}
        />
        <div
          className={styles.reader}
        >
          <FrontMatter
            imagesLocation={imagesLocation}
            info={info}
            frontmatter={frontmatter}
          />
          <Blocks
            imagesLocation={imagesLocation}
            seek={seek}
          />
          {renderIndex >= book.chapters.length - 1
            && (
            <BackMatter
              imagesLocation={imagesLocation}
              backmatter={backmatter}
            />
            )
          }
        </div>
      </div>
    );
  }
}

Reader.propTypes = {
  autoscroll: PropTypes.bool.isRequired,
  assetsLocation: PropTypes.string.isRequired,
  book: PropTypes.shape({
    assetsLocation: PropTypes.string,
    audio: PropTypes.shape({ src: PropTypes.string, size: PropTypes.number }),
    chapters: PropTypes.array,
  }).isRequired,
  bookViewerElement: PropTypes.instanceOf(HTMLDivElement),
  darkmode: PropTypes.bool.isRequired,
  imagesLocation: PropTypes.string.isRequired,
  info: PropTypes.shape({
    author: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  frontmatter: PropTypes.arrayOf(PropTypes.object).isRequired,
  backmatter: PropTypes.arrayOf(PropTypes.object).isRequired,
  mountBookAndAssets: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  refPlayer: PropTypes.func.isRequired,
  seek: PropTypes.func.isRequired,
  timeUpdate: PropTypes.func.isRequired,
  scrollHandler: PropTypes.func.isRequired,
  renderIndex: PropTypes.number.isRequired,
};

Reader.defaultProps = {
  bookViewerElement: {},
};
