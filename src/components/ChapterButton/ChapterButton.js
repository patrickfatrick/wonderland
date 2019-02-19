import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { truncate, isSmallScreen, scrollToY } from '../../lib/utils';
import styles from './ChapterButton.css';

export default class ChapterButton extends Component {
  handleChapterSelect = () => {
    const {
      index,
      audioPlayerElement,
      chapter: { timestamp },
      chapterSelectHandler,
      toggleChapterSelect,
    } = this.props;
    toggleChapterSelect(false);
    chapterSelectHandler(index, audioPlayerElement, timestamp);
    // Wait until everything has been rendered if that's needed,
    // which can potentially take some time
    window.setTimeout(this.scrollToChapterHeading, 1500);
  };

  scrollToChapterHeading = () => {
    const { chapter } = this.props;
    scrollToY(
      chapter.el.offsetTop - (isSmallScreen() ? 75 : 30),
    );
  }

  render() {
    const {
      chapter, darkmode,
    } = this.props;
    return (
      <li
        key={chapter.id}
        className={classNames(
          styles.chapterHeading,
          styles.chapterHeadingOption,
        )}
      >
        <button
          type="button"
          className={
            classNames({
              [styles.chapterOptionButton]: true,
              [styles.chapterOptionButtonActive]: chapter.active,
              [styles.chapterOptionButtonDarkmodeOn]: darkmode,
              [styles.chapterOptionButtonActiveDarkmodeOn]: chapter.active
              && darkmode,
            })
          }
          onClick={this.handleChapterSelect}
        >
          {isSmallScreen()
            ? truncate(chapter.title, 18)
            : chapter.title
          }
        </button>
      </li>
    );
  }
}

ChapterButton.propTypes = {
  chapter: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    timestamp: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
  darkmode: PropTypes.bool.isRequired,
  chapterSelectHandler: PropTypes.func.isRequired,
  toggleChapterSelect: PropTypes.func.isRequired,
  audioPlayerElement: PropTypes.instanceOf(HTMLAudioElement),
};

ChapterButton.defaultProps = {
  audioPlayerElement: {},
};
