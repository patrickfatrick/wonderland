import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Block from '../Block';

export default class Blocks extends Component {
  static propTypes = {
    imagesLocation: PropTypes.string.isRequired,
    pageItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    refBookViewer: PropTypes.func.isRequired,
    refChapterHeading: PropTypes.func.isRequired,
    seek: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { refBookViewer } = this.props;
    refBookViewer(this.bookViewerElement);
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
        ref={(el) => {
          this.bookViewerElement = el;
        }}
      >
        {pageItems.map(pageItem => (
          <Block
            key={pageItem.id}
            block={pageItem}
            seek={seek}
            imagesLocation={imagesLocation}
            refChapterHeading={refChapterHeading}
          />
        ))}
      </div>
    );
  }
}
