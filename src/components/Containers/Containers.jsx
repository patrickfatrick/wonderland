import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '../Container';
import styles from './Containers.css';

export default class Containers extends Component {
  static propTypes = {
    imagesLocation: PropTypes.string.isRequired,
    pageItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    refBookViewer: PropTypes.func.isRequired,
    refChapterHeading: PropTypes.func.isRequired,
    seek: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.refBookViewer(this.bookViewerElement);
  }

  render() {
    const {
      pageItems,
      imagesLocation,
      refChapterHeading,
      seek,
    } = this.props;

    return (
      <div
        id="book-viewer"
        className={styles.containers}
        ref={(el) => {
          this.bookViewerElement = el;
        }}
      >
        {pageItems.map(pageItem => (
          <Container
            key={pageItem.id}
            container={pageItem}
            seek={seek}
            imagesLocation={imagesLocation}
            refChapterHeading={refChapterHeading}
          />
        ))}
      </div>
    );
  }
}
