import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { debounce } from 'lodash';
import { truncate } from '../../lib/utils';
import ChapterButton from '../ChapterButton';
import styles from './Chapters.css';

export default class Chapters extends Component {
  state = { chapterSelectToggled: false, nodeWidth: 0 };

  componentDidMount() {
    this.resizeObserver.observe(document.body);
  }

  componentWillUnmount() {
    this.resizeObserver.unobserve(document.body);
  }

  set nodeWidth(width) {
    this.setState({ nodeWidth: width });
  }

  get chapterSelectHeading() {
    const { chapters, activeChapter } = this.props;
    const { nodeWidth } = this.state;
    if (!activeChapter) return 'Select a Chapter';
    const { title } = chapters[activeChapter];
    return nodeWidth < 480 ? truncate(title, 18) : title;
  }

  resizeObserver = new ResizeObserver(debounce((entries) => {
    const { width } = entries[0].contentRect;
    this.nodeWidth = width;
  }, 100))

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
      <li
        className={styles.chapterHeading}
        ref={(node) => {
          this.node = node;
        }}
      >
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
