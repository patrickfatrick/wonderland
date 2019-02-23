import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import assignStyles from '../../lib/assignStyles';
import styles from './Image.css';

export default class Image extends Component {
  state = { nodeWidth: 0 };

  componentDidMount() {
    this.interSectionObserver.observe(this.imageNode);
    this.resizeObserver.observe(document.body);
  }

  componentWillUnmount() {
    this.interSectionObserver.unobserve(this.imageNode);
    this.resizeObserver.unobserve(document.body);
  }

  set nodeWidth(width) {
    this.setState({ nodeWidth: width });
  }

  get styles() {
    return assignStyles.bind(this)('minHeight');
  }

  get minHeight() {
    const { image: { dimensions } } = this.props;
    const { nodeWidth } = this.state;
    return nodeWidth < 600
      ? dimensions[1] / (dimensions[0] / document.body.clientWidth)
      : dimensions[1];
  }

  // eslint-disable-next-line react/sort-comp
  renderActualImage = (entries) => {
    const { image: { src }, imagesLocation } = this.props;
    entries.forEach((entry) => {
      if (entry.intersectionRatio < 0.5) return;
      if (this.imageNode.src.includes(src)) return;
      this.imageNode.src = imagesLocation + src;
    });
  }

  interSectionObserver = new IntersectionObserver(
    this.renderActualImage,
    {
      root: null,
      rootMargin: '0px',
      threshold: [0.5],
    },
  );

  resizeObserver = new ResizeObserver(debounce((entries) => {
    const { width } = entries[0].contentRect;
    this.nodeWidth = width;
  }, 100));

  render() {
    const {
      image,
      imagesLocation,
    } = this.props;
    return (
      <div
        className={styles.imageContainer}
        ref={(node) => {
          this.node = node;
        }}
      >
        <img
          alt={image.src}
          className={styles.image}
          style={this.styles}
          src={image.src ? imagesLocation + image.thumb : null}
          ref={(node) => {
            this.imageNode = node;
          }}
        />
      </div>
    );
  }
}

Image.propTypes = {
  image: PropTypes.shape({
    type: PropTypes.string,
    src: PropTypes.string,
    dimensions: PropTypes.arrayOf(PropTypes.number),
    thumb: PropTypes.string,
  }).isRequired,
  imagesLocation: PropTypes.string.isRequired,
};
