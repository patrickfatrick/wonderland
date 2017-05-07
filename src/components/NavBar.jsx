/* globals document */

import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import ButtonsWrapper from '../wrappers/ButtonsWrapper';
import Chapters from './Chapters';
import truncate from '../lib/utils';

const styles = {
  navbar: {
    position: 'fixed',
    width: '100%',
    minHeight: '120px',
    top: '0',
    background: 'white',
    boxShadow: 'rgba(0, 0, 0, 0.15) 0 10px 30px, rgba(0, 0, 0, 0.10) 0 5px 10px',
    '@media (min-width: 768px)': {
      minHeight: '75px',
    },
    '& .item': {
      display: 'inline-block',
      fontFamily: '"Cormorant Garamond", Garamond, Georgia, serif',
    },
  },
  list: {
    position: 'relative',
    margin: 0,
    padding: '1rem 0.5rem 1rem 0.5rem',
    '@media (min-width: 768px)': {
      padding: '1rem 30px 1rem 30px',
    },
  },
};

function NavBar({
  info,
  chapters,
  sheet: { classes }, // eslint-disable-line react/prop-types
}) {
  return (
    <div
      id="navbar"
      className={classes.navbar}
    >
      {info && (
        <ul
          id="navbar-items"
          className={classes.list}
        >
          <li className="item">
            <span className={classes.title}>
              {(document.body.clientWidth <= 480)
                ? truncate(info.title, 30)
                : info.title
              }
            </span>
            <br />
            {info.author}
          </li>
          <Chapters chapters={chapters} />
          <ButtonsWrapper />
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
  chapters: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default injectSheet(styles)(NavBar);
