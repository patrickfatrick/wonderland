/* globals window, HTMLAudioElement */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import { convertRgbToHexWithHash, multiplyRgbChannels } from 'colorizer';
import { truncate, isSmallScreen, scrollToY } from '../lib/utils';

const styles = {
  chaptersContainer: {
    position: 'absolute',
    top: 0,
  },
  chapterSelectToggle: {
    outline: 'none',
    border: 'none',
    color: 'inherit',
    backgroundColor: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    margin: 0,
    '&:active': {
      backgroundColor: convertRgbToHexWithHash(multiplyRgbChannels(0.9)('fff')),
    },
  },
  chapterSelect: {
    display: 'none',
    position: 'absolute',
    top: '3rem',
    left: 0,
    paddingLeft: 0,
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#fff',
    overflowY: 'scroll',
    maxHeight: '250px',
    boxShadow: 'rgba(0, 0, 0, 0.15) 0 0px 30px, rgba(0, 0, 0, 0.10) 0 10px 10px',
    '&.toggled': {
      display: 'block',
    },
    '@media (min-height: 600px)': {
      maxHeight: '400px',
    },
    '@media (min-height: 700px)': {
      maxHeight: '600px',
    },
    '@media (min-height: 800px)': {
      maxHeight: 'none',
    },
  },
  chapterHeading: {
    fontSize: '2rem',
    fontFamily: '\'Cormorant Garamond\', Garamond, Georgia, serif',
    textAlign: 'center',
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    position: 'absolute',
    top: '4rem',
    left: 0,
    width: '100%',
    display: 'inline-block',
    '@media (min-width: 768px)': {
      top: '0.5rem',
    },
    '&.chapterOption': {
      display: 'block',
      position: 'relative',
      top: 0,
      backgroundColor: '#fff',
      margin: '0 auto',
      padding: '0.5rem 0',
    },
  },
  chapterOptionButton: {
    outline: 'none',
    border: 'none',
    color: 'inherit',
    backgroundColor: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    margin: 0,
    '&:active': {
      backgroundColor: convertRgbToHexWithHash(multiplyRgbChannels(0.9)('fff')),
    },
    '&.active': {
      backgroundColor: convertRgbToHexWithHash(multiplyRgbChannels(0.9)('fff')),
    },
  },
  title: {
    fontStyle: 'italic',
    fontSize: '1.2rem',
  },
};

class Chapters extends Component {
  static propTypes = {
    chapters: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      timestamp: PropTypes.number,
    }).isRequired,
    chapterOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeChapter: PropTypes.string,
    chapterSelectHandler: PropTypes.func.isRequired,
    audioPlayerElement: PropTypes.instanceOf(HTMLAudioElement),
  }

  static defaultProps = {
    activeChapter: '',
    audioPlayerElement: {},
  }

  constructor(props) {
    super(props);
    this.state = { chapterSelectToggled: false };
  }

  toggleChapterSelect = () => {
    this.setState({ chapterSelectToggled: !this.state.chapterSelectToggled });
  }

  scrollToChapterHeading = (chapterId) => {
    scrollToY(
      this.props.chapters[chapterId].el.offsetTop - (isSmallScreen() ? 75 : 30),
      5000,
    );
  }

  render() {
    const {
      chapters,
      chapterOrder,
      activeChapter,
      audioPlayerElement,
      chapterSelectHandler,
      sheet: { classes }, // eslint-disable-line react/prop-types
    } = this.props;

    return (
      <div>
        <li className={classes.chapterHeading}>
          <button
            type="button"
            onClick={this.toggleChapterSelect}
            className={classes.chapterSelectToggle}
          >
            {activeChapter && (isSmallScreen()
              ? truncate(chapters[activeChapter].title, 18)
              : chapters[activeChapter].title)
            }
            {!activeChapter && 'Select a Chapter'}
          </button>
          <ul
            className={classNames(
              classes.chapterSelect,
              { toggled: this.state.chapterSelectToggled },
            )}
          >
            {Object.keys(chapters).length && chapterOrder.map((chapterId, i) => (
              <li
                key={chapterId}
                className={classNames(classes.chapterHeading, { chapterOption: true })}
              >
                <button
                  type="button"
                  className={
                    classNames(classes.chapterOptionButton, { active: chapters[chapterId].active })
                  }
                  onClick={
                    () => {
                      this.toggleChapterSelect(false);
                      chapterSelectHandler(i, audioPlayerElement, chapters[chapterId].timestamp);
                      window.setTimeout(() => this.scrollToChapterHeading(chapterId), 500);
                    }
                  }
                >
                  {isSmallScreen()
                    ? truncate(chapters[chapterId].title, 18)
                    : chapters[chapterId].title
                  }
                </button>
              </li>
            ))}
          </ul>
        </li>
      </div>
    );
  }
}

export default injectSheet(styles)(Chapters);
