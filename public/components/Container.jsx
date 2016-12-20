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
    container: PropTypes.arrayOf(PropTypes.object).isRequired,
    imagesLocation: PropTypes.string.isRequired,
    refChapterHeading: PropTypes.func.isRequired,
    seek: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.chapterHeading) {
      this.props.refChapterHeading(this.chapterHeading, this.props.container[0].title);
    }
  }

  render() {
    const classes = this.props.sheet.classes; // eslint-disable-line react/prop-types
    return (
      <div className="page-item">
        {(this.props.container[0].lineType === 'normal') &&
          <span
            className={classes.indent}
          />
        }
        {this.props.container.map((lineItem) => {
          if (lineItem.type === 'flourish') return <Flourish key={lineItem.id} />;
          if (lineItem.type === 'image') {
            return (
              <Image
                key={lineItem.id}
                image={lineItem}
                imagesLocation={this.props.imagesLocation}
              />
            );
          }
          if (lineItem.type === 'chapterheading') {
            return (
              <div
                key={lineItem.id}
                className={classes.chapterHeading}
                ref={(node) => {
                  this.chapterHeading = node;
                }}
              >
                {lineItem.title}
              </div>
            );
          }
          return (
            <LineWrapper
              key={lineItem.id}
              seek={this.props.seek}
              line={lineItem}
            />
          );
        })}
      </div>
    );
  }
}

export default injectSheet(styles)(Container);
