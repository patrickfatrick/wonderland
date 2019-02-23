import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { debounce } from 'lodash';
import { truncate, isSmallScreen, scrollToY } from '../../lib/utils';
import styles from './ChapterButton.css';

export default class ChapterButton extends Component {
  state = { nodeWidth: 0 };

  componentDidMount() {
    this.resizeObserver.observe(this.node);
  }

  componentWillUnmount() {
    this.resizeObserver.unobserve(this.node);
  }

  set nodeWidth(width) {
    this.setState({ nodeWidth: width });
  }

  get chapterSelectHeading() {
    const { chapter: { title } } = this.props;
    const { nodeWidth } = this.state;
    return nodeWidth < 480 ? truncate(title, 18) : title;
  }

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
  }

  scrollToChapterHeading = () => {
    const { chapter } = this.props;
    scrollToY(chapter.el.offsetTop - (isSmallScreen() ? 75 : 30));
  }

  resizeObserver = new ResizeObserver(debounce((entries) => {
    const { width } = entries[0].contentRect;
    this.nodeWidth = width;
  }, 100))

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
        ref={(node) => {
          this.node = node;
        }}
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
          {this.chapterSelectHeading}
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
