import React from "react";
import PropTypes from "prop-types";
import c from "classnames";
import truncate from "../../utils/truncate";
import useResizeObserver from "../../hooks/useResizeObserver";
import Controls from "../Controls";
import Chapters from "../Chapters";
import infoShape from "../../shapes/infoShape";
import styles from "./NavBar.css";

export default function NavBar({
  info,
  darkmode,
}) {
  const { node: metadataNode, nodeWidth: metadataNodeWidth } = useResizeObserver();

  const title = metadataNodeWidth < 250 ? truncate(info.title, 18) : info.title;

  return (
    <div
      className={
        c({
          [styles.navbar]: true,
          [styles.navbarDarkmodeOn]: darkmode,
        })
      }
    >
      {info && (
        <ul className={styles.navbarItems}>
          <li
            className={styles.metadata}
            ref={metadataNode}
          >
            <span className={styles.title}>
              {title}
            </span>
            <br />
            {info.author}
          </li>
          <Controls />
          <Chapters />
        </ul>
      )}
    </div>
  );
}

NavBar.propTypes = {
  info: infoShape.isRequired,
  darkmode: PropTypes.bool.isRequired,
};
