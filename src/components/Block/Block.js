import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Line from '../Line';
import Flourish from '../Flourish';
import Image from '../Image';
import styles from './Block.css';

export default function Block({
  block,
  refChapterHeading,
}) {
  const chapterHeading = useRef();
  let children = null;

  useEffect(() => {
    const { current: ref } = chapterHeading;
    if (ref) refChapterHeading(ref, block.chapterId);
  }, []);

  switch (block.type) {
    case 'flourish':
      children = <Flourish key={block.id} />;
      break;
    case 'image':
      children = (
        <Image
          key={block.id}
          image={block}
        />
      );
      break;
    case 'heading':
      children = (
        <div
          key={block.id}
          className={styles.heading}
          ref={chapterHeading}
        >
          {block.title}
        </div>
      );
      break;
    case 'paragraph':
      children = (
        <div>
          <span
            className={styles.indent}
          />
          {block.lines.map(lineId => (
            <Line
              key={lineId}
              lineId={lineId}
            />
          ))}
        </div>
      );
      break;
    case 'preformatted':
      children = (
        <span
          dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
            __html: block.content,
          }}
        />
      );
      break;
    default:
      children = null;
  }

  return (
    <div className={styles.block}>
      {children}
    </div>
  );
}

Block.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.string,
    chapterId: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    lines: PropTypes.array,
  }).isRequired,
  refChapterHeading: PropTypes.func,
};

Block.defaultProps = {
  refChapterHeading: () => {},
};
