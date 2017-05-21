/* globals window document */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    window.setTimeout(() => {
      this.image.src = this.props.imagesLocation + this.props.image.src;
    }, 1000);
  }

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
          {...(image.src && { src: imagesLocation + image.thumb })}
          ref={(node) => {
            this.image = node;
          }}
        />
      </div>
    );
  }
}
