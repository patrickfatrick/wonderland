import React, { useCallback, useRef } from "react";
import PropTypes from "prop-types";
import c from "classnames";
import seek from "../../utils/seek";
import lineShape from "../../shapes/lineShape";
import styles from "./Line.css";

export default function Line({
  audioOn,
  darkmode,
  line,
  audioPlayerElement,
  updateAudioTimestamp,
}) {
  const node = useRef();
  // Both seek the player and store the timestamp in the store in case the player is not seekable
  const clickHandler = useCallback(() => {
    seek(audioPlayerElement, line.timestampStart);
    updateAudioTimestamp(line.timestampStart);
  }, [updateAudioTimestamp, audioPlayerElement, line.timestampStart]);

  const { active, content } = line;

  return (
    <span>
      <a // eslint-disable-line jsx-a11y/anchor-is-valid
        href="#"
        tabIndex="0"
        className={
          c({
            [styles.line]: true,
            [styles.lineDarkmodeOn]: darkmode,
            [styles.lineActive]: (!darkmode && active && audioOn),
            [styles.lineActiveDarkmodeOn]: (darkmode && active && audioOn),
          })
        }
        data-active-line={active}
        onClick={clickHandler}
        dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
          __html: content,
        }}
        ref={node}
      />
    </span>
  );
}

Line.propTypes = {
  audioOn: PropTypes.bool.isRequired,
  audioPlayerElement: PropTypes.instanceOf(HTMLAudioElement),
  darkmode: PropTypes.bool.isRequired,
  updateAudioTimestamp: PropTypes.func.isRequired,
  line: lineShape.isRequired,
};

Line.defaultProps = {
  audioPlayerElement: null,
};
