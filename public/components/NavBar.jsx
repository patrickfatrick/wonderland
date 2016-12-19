import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import ButtonsWrapper from '../wrappers/ButtonsWrapper';

const styles = {
  navbar: {
    position: 'fixed',
    width: '100%',
    top: '0',
    background: 'white',
    boxShadow: 'rgba(0, 0, 0, 0.15) 0 10px 30px, rgba(0, 0, 0, 0.10) 0 5px 10px',
    '& .list': {
      position: 'relative',
      margin: 0,
      padding: '1rem 30px 1rem 30px',
    },
    '& .item': {
      display: 'inline-block',
      fontFamily: '"Cormorant Garamond", Garamond, Georgia, serif',
    },
  },
  chapterHeading: {
    fontSize: '2rem',
    fontFamily: '\'Cormorant Garamond\', Garamond, Georgia, serif',
    textAlign: 'center',
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    position: 'absolute',
    top: '10px',
    left: 0,
    width: '100%',
    display: 'none',
    '&.active': {
      display: 'inline-block',
    },
  },
  title: {
    fontStyle: 'italic',
    fontSize: '1.2rem',
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
          className="list"
        >
          <li className="item">
            <span className={classes.title}>
              {info.title}
            </span>
            <br />
            {info.author}
          </li>
          {chapters.map(chapter => (
            <li
              key={chapter.id}
              className={classNames(classes.chapterHeading, { active: chapter.active })}
            >
              {chapter.title}
            </li>
          ))}
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
  chapters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default injectSheet(styles)(NavBar);
