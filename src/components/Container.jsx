import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import LineWrapper from '../wrappers/LineWrapper';
import Flourish from './Flourish';
import Image from './Image';

const styles = {
  indent: {
    paddingRight: '1rem',
    paddingLeft: '1rem',
  },
  chapterHeading: {
    fontSize: '2rem',
    textAlign: 'center',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
};

class Container extends Component {
  static propTypes = {
    container: PropTypes.shape({
      id: PropTypes.string,
      chapterId: PropTypes.string,
      type: PropTypes.string,
      title: PropTypes.string,
      lines: PropTypes.array,
    }).isRequired,
    imagesLocation: PropTypes.string.isRequired,
    refChapterHeading: PropTypes.func,
    seek: PropTypes.func,
  };

  static defaultProps = {
    refChapterHeading() {},
    seek() {},
  }

  componentDidMount() {
    if (this.chapterHeading) {
      this.props.refChapterHeading(this.chapterHeading, this.props.container.chapterId);
    }
  }

  render() {
    const classes = this.props.sheet.classes; // eslint-disable-line react/prop-types
    return (
      <div className="page-item">
        {(this.props.container.type === 'flourish') && <Flourish key={this.props.container.id} />}
        {(this.props.container.type === 'image') &&
          <Image
            key={this.props.container.id}
            image={this.props.container}
            imagesLocation={this.props.imagesLocation}
          />
        }
        {(this.props.container.type === 'chapterheading') &&
          <div
            key={this.props.container.id}
            className={classes.chapterHeading}
            ref={(node) => {
              this.chapterHeading = node;
            }}
          >
            {this.props.container.title}
          </div>
        }
        {(this.props.container.type === 'paragraph') &&
          <span
            className={classes.indent}
          />
        }
        {(this.props.container.type === 'paragraph') &&
          this.props.container.lines.map(lineId => (
            <LineWrapper
              key={lineId}
              seek={this.props.seek}
              lineId={lineId}
            />
          ))
        }
      </div>
    );
  }
}

export default injectSheet(styles)(Container);
