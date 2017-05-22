/* globals window document HTMLDivElement */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContainersWrapper from '../../wrappers/ContainersWrapper';
import NavBar from '../NavBar';
import FrontMatter from '../FrontMatter';
import BackMatter from '../BackMatter';
import styles from './Reader.css';

export default class Reader extends Component {
  static propTypes = {
    autoscroll: PropTypes.bool.isRequired,
    assetsLocation: PropTypes.string.isRequired,
    book: PropTypes.shape({
      assetsLocation: PropTypes.string,
      audio: PropTypes.shape({ src: PropTypes.string, size: PropTypes.number }),
      chapters: PropTypes.array,
    }).isRequired,
    bookViewerElement: PropTypes.instanceOf(HTMLDivElement),
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
  }

  static defaultProps = {
    bookViewerElement: {},
  }

  componentWillMount() {
    this.props.mountBookAndAssets(this.props.path);
  }

  componentDidMount() {
    this.props.refPlayer(this.player);
    window.addEventListener('scroll', () => {
      this.props.scrollHandler({
        scrollPos: window.scrollY,
        offset: document.body.clientHeight - window.innerHeight,
      });
    });
  }

  render() {
    const {
      book,
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
      <div>
        <div
          id="audio-container"
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
        />
        <div
          className={styles.reader}
        >
          <FrontMatter
            imagesLocation={imagesLocation}
            info={info}
            frontmatter={frontmatter}
          />
          <ContainersWrapper
            imagesLocation={imagesLocation}
            seek={seek}
          />
          {renderIndex >= book.chapters.length - 1 &&
            <BackMatter
              imagesLocation={imagesLocation}
              backmatter={backmatter}
            />
          }
        </div>
      </div>
    );
  }
}
