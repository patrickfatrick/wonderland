import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'intersection-observer';
import { isMediumScreen } from '../../lib/utils';
import styles from './Image.css';

export default class Image extends Component {
  static propTypes = {
    image: PropTypes.shape({
      type: PropTypes.string,
      src: PropTypes.string,
      thumb: PropTypes.string,
    }).isRequired,
    imagesLocation: PropTypes.string.isRequired,
  }

  componentDidMount() {
    window.requestAnimationFrame(() => {
      this.interSectionObserver.observe(this.image);
    });
  }

  componentWillUnmount() {
    this.interSectionObserver.unobserve(this.image);
  }

  renderActualImage = (entries) => {
    const { imagesLocation, image } = this.props;
    entries.forEach((entry) => {
      if (entry.intersectionRatio < 0.5) return;
      if (this.image.src.includes(image.src)) return;
      this.image.src = imagesLocation + image.src;
    });
  };

  // eslint-disable-next-line react/sort-comp
  interSectionObserver = new IntersectionObserver(this.renderActualImage, {
    root: null,
    rootMargin: '0px',
    threshold: [0.5],
  });

  render() {
    const {
      image,
      imagesLocation,
    } = this.props;

    const minWidth = (isMediumScreen())
      ? '100%'
      : image.dimensions[0];

    const minHeight = (isMediumScreen())
      ? image.dimensions[1] / (image.dimensions[0] / document.body.clientWidth)
      : image.dimensions[1];

    return (
      <div className={styles.imageContainer}>
        <img
          alt={image.src}
          className={styles.image}
          style={{ minWidth, minHeight }}
          src={image.src ? imagesLocation + image.thumb : null}
          ref={(node) => {
            this.image = node;
          }}
        />
      </div>
    );
  }
}
