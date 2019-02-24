import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import truncate from '../../utils/truncate';
import useResizeObserver from '../../hooks/useResizeObserver';
import Controls from '../Controls';
import Chapters from '../Chapters';
import styles from './NavBar.css';

export default function NavBar({
  info,
  darkmode,
}) {
  const { node: metadataNode, nodeWidth: metadataNodeWidth } = useResizeObserver();

  const title = metadataNodeWidth < 250 ? truncate(info.title, 18) : info.title;

  return (
    <div
      className={
        classNames({
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
  info: PropTypes.shape({
    author: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  darkmode: PropTypes.bool.isRequired,
};
