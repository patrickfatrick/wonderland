/* globals window, HTMLAudioElement */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { truncate, isSmallScreen, scrollToY } from '../../lib/utils';
import styles from './Chapters.css';


export default class Chapters extends Component {
  static propTypes = {
    chapters: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      timestamp: PropTypes.number,
    }).isRequired,
    chapterOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
    darkmode: PropTypes.bool.isRequired,
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
    );
  }

  render() {
    const {
      chapters,
      chapterOrder,
      darkmode,
      activeChapter,
      audioPlayerElement,
      chapterSelectHandler,
    } = this.props;

    return (
      <li className={styles.chapterHeading}>
        <button
          type="button"
          onClick={(e) => {
            e.currentTarget.blur();
            this.toggleChapterSelect();
          }}
          className={
            classNames({
              [styles.chapterSelectToggle]: true,
              [styles.chapterSelectToggleDarkmodeOn]: darkmode,
            })
          }
        >
          {activeChapter && (isSmallScreen()
            ? truncate(chapters[activeChapter].title, 18)
            : chapters[activeChapter].title)
          }
          {!activeChapter && 'Select a Chapter'}
        </button>
        <ul
          className={classNames(
            styles.chapterSelect,
            { [styles.chapterSelectToggled]: this.state.chapterSelectToggled },
          )}
        >
          {Object.keys(chapters).length && chapterOrder.map((chapterId, i) => (
            <li
              key={chapterId}
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
                    [styles.chapterOptionButtonActive]: chapters[chapterId].active,
                    [styles.chapterOptionButtonDarkmodeOn]: darkmode,
                    [styles.chapterOptionButtonActiveDarkmodeOn]: chapters[chapterId].active
                    && darkmode,
                  })
                }
                onClick={
                  (e) => {
                    e.currentTarget.blur();
                    this.toggleChapterSelect(false);
                    chapterSelectHandler(i, audioPlayerElement, chapters[chapterId].timestamp);
                    // Wait until everything has been rendered if that's needed,
                    // which can potentially take some time
                    window.setTimeout(() => this.scrollToChapterHeading(chapterId), 1500);
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
    );
  }
}
