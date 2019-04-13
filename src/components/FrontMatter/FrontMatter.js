import React from "react";
import PropTypes from "prop-types";
import c from "classnames";
import Block from "../Block";
import infoShape from "../../shapes/infoShape";
import frontmatterShape from "../../shapes/frontmatterShape";
import styles from "./FrontMatter.css";

export default function FrontMatter({
  info,
  frontmatter,
  darkmode,
}) {
  return (
    <div className={styles.frontmatter}>
      <h1 className={styles.title}>
        {info.title}
      </h1>
      <div className={styles.author}>
        {info.author}
      </div>
      <h2 className={styles.performedBy}>Performers</h2>
      <ul className={styles.performedByList}>
        {info.performers.map(performer => (
          <li className={styles.performedByListItem} key={performer.role}>
            <span
              className={c(styles.role, { [styles.roleDarkmodeOn]: darkmode })}
            >
              <em>{performer.role}</em>
            </span>
            <span
              className={c(styles.performer, { [styles.roleDarkmodeOn]: darkmode })}
            >
              {performer.performer}
            </span>
          </li>
        ))}
      </ul>
      {frontmatter.map(block => (
        <Block
          key={block.id}
          block={block}
        />
      ))}
    </div>
  );
}

FrontMatter.propTypes = {
  info: infoShape.isRequired,
  frontmatter: frontmatterShape.isRequired,
  darkmode: PropTypes.bool.isRequired,
};
