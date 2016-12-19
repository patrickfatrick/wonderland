/* globals window document HTMLDivElement */

import React, { PureComponent, PropTypes } from 'react';
import injectSheet from 'react-jss';
import ContainersWrapper from '../wrappers/ContainersWrapper';
import NavBar from './NavBar';

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

class Book extends PureComponent {
  static propTypes = {
    autoscroll: PropTypes.bool.isRequired,
    book: PropTypes.shape({
      assetsLocation: PropTypes.string,
      audioSrc: PropTypes.string,
    }).isRequired,
    bookViewerElement: PropTypes.instanceOf(HTMLDivElement),
    info: PropTypes.shape({
      author: PropTypes.string,
      title: PropTypes.string,
    }).isRequired,
    chapters: PropTypes.arrayOf(PropTypes.object).isRequired,
    mountBookAndAssets: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    refPlayer: PropTypes.func.isRequired,
    seek: PropTypes.func.isRequired,
    timeUpdate: PropTypes.func.isRequired,
    scrollHandler: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.mountBookAndAssets(this.props.path);
  }

  componentDidMount() {
    this.props.refPlayer(this.player);
    window.addEventListener('scroll', () => {
      this.props.scrollHandler({
        book: this.props.book,
        scrollPos: window.scrollY,
        offset: document.body.clientHeight - window.innerHeight,
      });
    });
  }

  render() {
    const classes = this.props.sheet.classes; // eslint-disable-line react/prop-types
    return (
      <div>
        <div
          id="audio-container"
          className={classes.audioContainer}
        >
          <audio
            preload="metadata"
            {...(this.props.book.audioSrc && { src: `${this.props.book.assetsLocation}audio/${this.props.book.audioSrc}` })}
            onTimeUpdate={(e) => {
              this.props.timeUpdate(e, this.props.bookViewerElement, this.props.autoscroll);
            }}
            ref={(node) => {
              this.player = node;
            }}
          />
        </div>
        <NavBar
          info={this.props.info}
          chapters={this.props.chapters}
        />
        <div
          id="reader"
          className={classes.reader}
        >
          <ContainersWrapper
            seek={this.props.seek}
          />
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(Book);
