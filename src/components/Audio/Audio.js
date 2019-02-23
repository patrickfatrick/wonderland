import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Audio.css';

export default class Audio extends Component {
  componentDidMount() {
    const { refPlayer } = this.props;
    refPlayer(this.player);
  }

  onTimeUpdateHandler = (e) => {
    const { timeUpdate, bookViewerElement, autoscroll } = this.props;
    timeUpdate(e, bookViewerElement, autoscroll);
    this.autoscroll();
  }

  autoscroll() {
    const { bookViewerElement, autoscroll } = this.props;
    if (!autoscroll) return;
    const activeLine = bookViewerElement.querySelector('[data-active-line=true]');
    if (!activeLine) return;
    window.scroll(0, activeLine.offsetTop - 200);
  }

  render() {
    const { audioLocation } = this.props;
    return (
      <div
        className={styles.audioContainer}
      >
        <audio // eslint-disable-line jsx-a11y/media-has-caption
          preload="metadata"
          type="audio/mp4"
          src={audioLocation}
          onTimeUpdate={this.onTimeUpdateHandler}
          ref={(node) => {
            this.player = node;
          }}
        />
      </div>
    );
  }
}

Audio.propTypes = {
  audioLocation: PropTypes.string.isRequired,
  autoscroll: PropTypes.bool.isRequired,
  timeUpdate: PropTypes.func.isRequired,
  bookViewerElement: PropTypes.instanceOf(HTMLDivElement),
  refPlayer: PropTypes.func.isRequired,
};

Audio.defaultProps = {
  bookViewerElement: {},
};
