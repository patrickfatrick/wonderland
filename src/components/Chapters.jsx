/* globals document */

import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import truncate from '../lib/utils';

const styles = {
  chaptersContainer: {
    position: 'absolute',
    top: 0,
  },
  chapterHeading: {
    fontSize: '2rem',
    fontFamily: '\'Cormorant Garamond\', Garamond, Georgia, serif',
    textAlign: 'center',
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    position: 'absolute',
    top: '4rem',
    left: 0,
    width: '100%',
    display: 'none',
    '@media (min-width: 768px)': {
      top: '1rem',
    },
    '&.active': {
      display: 'inline-block',
    },
  },
  title: {
    fontStyle: 'italic',
    fontSize: '1.2rem',
  },
};

function Chapters({
  chapters,
  sheet: { classes }, // eslint-disable-line react/prop-types
}) {
  return (
    <div>
      {Object.keys(chapters).map(chapterId => (
        <li
          key={chapterId}
          className={classNames(classes.chapterHeading, { active: chapters[chapterId].active })}
        >
          {(document.body.clientWidth <= 480)
            ? truncate(chapters[chapterId].title, 18)
            : chapters[chapterId].title
          }
        </li>
      ))}
    </div>
  );
}

Chapters.propTypes = {
  chapters: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default injectSheet(styles)(Chapters);
