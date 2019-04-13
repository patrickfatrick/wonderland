import React, { Fragment, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Line from "../Line";
import Flourish from "../Flourish";
import Image from "../Image";
import blockShape from "../../shapes/blockShape";
import styles from "./Block.css";

export default function Block({
  block,
  refChapterHeading,
}) {
  const chapterHeading = useRef();
  let children = null;

  useEffect(() => {
    const { current: ref } = chapterHeading;
    if (ref) refChapterHeading(ref, block.chapterId);
  }, [block.chapterId, refChapterHeading]);

  switch (block.type) {
    case "flourish":
      children = <Flourish key={block.id} />;
      break;
    case "image":
      children = (
        <Image
          key={block.id}
          image={block}
        />
      );
      break;
    case "heading":
      children = (
        <h1
          key={block.id}
          className={styles.heading}
          ref={chapterHeading}
        >
          {block.title}
        </h1>
      );
      break;
    case "paragraph":
      children = (
        <Fragment>
          <span
            className={styles.indent}
          />
          {block.lines.map(lineId => (
            <Line
              key={lineId}
              lineId={lineId}
            />
          ))}
        </Fragment>
      );
      break;
    case "fixed":
      children = block.lines ? (
        block.lines.map(lineId => (
          <div
            className={styles.fixedLine}
            key={lineId}
          >
            <Line
              lineId={lineId}
            />
          </div>
        ))
      ) : (
        <span
          className={styles.fixed}
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
  block: blockShape.isRequired,
  refChapterHeading: PropTypes.func,
};

Block.defaultProps = {
  refChapterHeading: () => {},
};
