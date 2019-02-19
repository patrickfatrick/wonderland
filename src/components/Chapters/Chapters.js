import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { truncate, isSmallScreen } from '../../lib/utils';
import ChapterButton from '../ChapterButton';
import styles from './Chapters.css';


export default class Chapters extends Component {
  state = { chapterSelectToggled: false };

  get chapterSelectHeading() {
    const { chapters, activeChapter } = this.props;
    if (!activeChapter) return 'Select a Chapter';
    const { title } = chapters[activeChapter];
    return isSmallScreen() ? truncate(title, 18) : title;
  }

  toggleChapterSelect = () => {
    this.setState((prevState) => {
      const { chapterSelectToggled } = prevState;
      return { chapterSelectToggled: !chapterSelectToggled };
    });
  }

  handleToggleChapterSelect = (e) => {
    e.currentTarget.blur();
    this.toggleChapterSelect();
  };

  render() {
    const {
      chapters,
      chapterOrder,
      darkmode,
    } = this.props;
    const { chapterSelectToggled } = this.state;

    return (
      <li className={styles.chapterHeading}>
        <button
          type="button"
          onClick={this.handleToggleChapterSelect}
          className={
            classNames({
              [styles.chapterSelectToggle]: true,
              [styles.chapterSelectToggleDarkmodeOn]: darkmode,
            })
          }
        >
          {this.chapterSelectHeading}
        </button>
        <ul
          className={
            classNames({
              [styles.chapterSelect]: true,
              [styles.chapterSelectDarkmodeOn]: darkmode,
              [styles.chapterSelectToggled]: chapterSelectToggled,
            })
          }
        >
          {Object.keys(chapters).length && chapterOrder.map((chapterId, i) => (
            <ChapterButton
              key={chapterId}
              chapter={chapters[chapterId]}
              index={i}
              darkmode={darkmode}
              toggleChapterSelect={this.toggleChapterSelect}
            />
          ))}
        </ul>
      </li>
    );
  }
}

Chapters.propTypes = {
  chapters: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  chapterOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
  darkmode: PropTypes.bool.isRequired,
  activeChapter: PropTypes.string,
};

Chapters.defaultProps = {
  activeChapter: '',
};
