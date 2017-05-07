import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Container from './Container';

const styles = {
  containers: {
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
  },
  '@media (min-width: 668px)': {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
};

class Containers extends Component {
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
    const classes = this.props.sheet.classes; // eslint-disable-line react/prop-types
    return (
      <div
        id="book-viewer"
        className={classes.containers}
        ref={(el) => {
          this.bookViewerElement = el;
        }}
      >
        {this.props.pageItems.map(pageItem => (
          <Container
            key={pageItem.id}
            container={pageItem}
            seek={this.props.seek}
            imagesLocation={this.props.imagesLocation}
            refChapterHeading={this.props.refChapterHeading}
          />
        ))}
      </div>
    );
  }
}

export default injectSheet(styles)(Containers);
