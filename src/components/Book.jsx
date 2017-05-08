/* globals window document HTMLDivElement */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import ContainersWrapper from '../wrappers/ContainersWrapper';
import NavBar from './NavBar';
import FrontMatter from './FrontMatter';

const styles = {
  audioContainer: {
    display: 'none',
  },
  reader: {
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'justify',
    fontSize: '1.3rem',
    fontFamily: '\'Cormorant Garamond\', Garamond, Georgia, serif',
    width: '100%',
    marginTop: '6rem',
    marginBottom: '3rem',
  },
  '@media(min-width: 668px)': {
    reader: {
      maxWidth: '600px',
    },
  },
};

class Book extends Component {
  static propTypes = {
    autoscroll: PropTypes.bool.isRequired,
    assetsLocation: PropTypes.string.isRequired,
    book: PropTypes.shape({
      assetsLocation: PropTypes.string,
      audioSrc: PropTypes.string,
      chapters: PropTypes.array,
    }).isRequired,
    bookViewerElement: PropTypes.instanceOf(HTMLDivElement),
    imagesLocation: PropTypes.string.isRequired,
    info: PropTypes.shape({
      author: PropTypes.string,
      title: PropTypes.string,
    }).isRequired,
    frontmatter: PropTypes.arrayOf(PropTypes.object).isRequired,
    mountBookAndAssets: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    refPlayer: PropTypes.func.isRequired,
    seek: PropTypes.func.isRequired,
    timeUpdate: PropTypes.func.isRequired,
    scrollHandler: PropTypes.func.isRequired,
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
      seek,
      timeUpdate,
      sheet: { classes }, // eslint-disable-line react/prop-types
    } = this.props;

    return (
      <div>
        <div
          id="audio-container"
          className={classes.audioContainer}
        >
          <audio
            preload="metadata"
            type="audio/mp4"
            {...(book.audioSrc && { src: `${assetsLocation}audio/${book.audioSrc}` })}
            onTimeUpdate={(e) => {
              timeUpdate(e, bookViewerElement, autoscroll);
            }}
            ref={(node) => {
              this.player = node;
            }}
          />
        </div>
        <NavBar info={info} />
        <div
          id="reader"
          className={classes.reader}
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
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(Book);
