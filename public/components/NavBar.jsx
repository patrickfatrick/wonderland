import React, { PropTypes } from 'react'
import ButtonsWrapper from '../wrappers/ButtonsWrapper'
import injectSheet from 'react-jss'
import classNames from 'classnames'

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
      padding: '1rem 30px 1rem 30px'
    },
    '& .item': {
      display: 'inline-block',
      fontFamily: '"Cormorant Garamond", Garamond, Georgia, serif'
    }
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
      display: 'inline-block'
    }
  },
  title: {
    fontStyle: 'italic',
    fontSize: '1.2rem'
  }
}

class NavBar extends React.Component {
  render () {
    const classes = this.props.sheet.classes
    return (
      <div
        id='navbar'
        className={classes.navbar}>
        {this.props.book.info && (
          <ul
            id='navbar-items'
            className='list'>
            <li className='item'>
              <span className={classes.title}>
                {this.props.book.info.title}
              </span>
              <br />
              {this.props.book.info.author}
            </li>
            {this.props.chapters.map((chapter, i) => {
              return (
                <li
                  key={i}
                  className={classNames(classes.chapterHeading, { active: chapter.active })}>
                  {chapter.title}
                </li>
              )
            })}
            <ButtonsWrapper />
          </ul>
        )}
      </div>
    )
  }
}

NavBar.propTypes = {
  book: PropTypes.object.isRequired,
  chapters: PropTypes.array.isRequired
}
export default injectSheet(styles)(NavBar)
