import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Line from '../Line';
import Flourish from '../Flourish';
import Image from '../Image';
import styles from './Block.css';

export default class Block extends Component {
  static propTypes = {
    block: PropTypes.shape({
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
    const { refChapterHeading, block } = this.props;
    if (this.chapterHeading) {
      refChapterHeading(this.chapterHeading, block.chapterId);
    }
  }

  get children() {
    const { block, imagesLocation, seek } = this.props;
    switch (block.type) {
      case 'flourish':
        return <Flourish key={block.id} />;
      case 'image':
        return (
          <Image
            key={block.id}
            image={block}
            imagesLocation={imagesLocation}
          />
        );
      case 'heading':
        return (
          <div
            key={block.id}
            className={styles.heading}
            ref={(node) => {
              this.chapterHeading = node;
            }}
          >
            {block.title}
          </div>
        );
      case 'paragraph':
        return (
          <div>
            <span
              className={styles.indent}
            />
            {block.lines.map(lineId => (
              <Line
                key={lineId}
                seek={seek}
                lineId={lineId}
              />
            ))}
          </div>
        );
      case 'preformatted':
        return (
          <span
            dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
              __html: block.content,
            }}
          />
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <div className={styles.block}>
        {this.children}
      </div>
    );
  }
}
