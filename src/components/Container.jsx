import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import LineWrapper from '../wrappers/LineWrapper';
import Flourish from './Flourish';
import Image from './Image';

const styles = {
  indent: {
    paddingRight: '1rem',
    paddingLeft: '1rem',
  },
  heading: {
    fontSize: '2rem',
    textAlign: 'center',
    marginTop: '3rem',
    marginBottom: '3rem',
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
    const {
      container,
      imagesLocation,
      seek,
      sheet: { classes }, // eslint-disable-line react/prop-types
    } = this.props;

    return (
      <div className="page-item">
        {(container.type === 'flourish') && <Flourish key={container.id} />}
        {(container.type === 'image') &&
          <Image
            key={container.id}
            image={container}
            imagesLocation={imagesLocation}
          />
        }
        {(container.type === 'heading') &&
          <div
            key={container.id}
            className={classes.heading}
            ref={(node) => {
              this.chapterHeading = node;
            }}
          >
            {container.title}
          </div>
        }
        {(container.type === 'paragraph') &&
          <span
            className={classes.indent}
          />
        }
        {(container.type === 'paragraph') &&
          container.lines.map(lineId => (
            <LineWrapper
              key={lineId}
              seek={seek}
              lineId={lineId}
            />
          ))
        }
        {(container.type === 'text') &&
          // This is fine as the html would be generated in the server
          <span
            dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
              __html: container.content,
            }}
          />
        }
      </div>
    );
  }
}

export default injectSheet(styles)(Container);
