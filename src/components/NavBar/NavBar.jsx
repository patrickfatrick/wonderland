import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ControlsWrapper from '../../wrappers/ControlsWrapper';
import ChaptersWrapper from '../../wrappers/ChaptersWrapper';
import { truncate, isSmallScreen } from '../../lib/utils';
import styles from './NavBar.css';

export default function NavBar({
  info,
  seek,
  darkmode,
}) {
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
          <li className={styles.metadata}>
            <span className={styles.title}>
              {isSmallScreen()
                ? truncate(info.title, 18)
                : info.title
              }
            </span>
            <br />
            {info.author}
          </li>
          <ChaptersWrapper seek={seek} />
          <ControlsWrapper />
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
  seek: PropTypes.func.isRequired,
  darkmode: PropTypes.bool.isRequired,
};
