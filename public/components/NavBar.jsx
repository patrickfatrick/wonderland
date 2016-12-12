import React, { PropTypes } from 'react'
import ButtonsWrapper from '../wrappers/ButtonsWrapper'
import m from './m'

class NavBar extends React.Component {
  constructor (props) {
    super(props)
    this.styles = {
      navbar: {
        position: 'fixed',
        width: '100%',
        top: '0',
        background: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.15) 0 10px 30px, rgba(0, 0, 0, 0.10) 0 5px 10px'
      },
      navbarList: {
        position: 'relative',
        margin: 0,
        padding: '1rem 30px 1rem 30px'
      },
      navbarItem: {
        display: 'inline-block',
        fontFamily: '"Cormorant Garamond", Garamond, Georgia, serif'
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
        display: 'none'
      },
      chapterHeadingActive: {
        display: 'inline-block'
      },
      title: {
        fontStyle: 'italic',
        fontSize: '1.2rem'
      }
    }
  }

  render () {
    return (
      <div
        id='navbar'
        style={m(this.styles.navbar)}>
        {this.props.book.info && (
          <ul
            id='navbar-items'
            style={m(this.styles.navbarList)}
            >
            <li style={m(this.styles.navbarItem)}>
              <span style={m(this.styles.title)}>
                {this.props.book.info.title}
              </span>
              <br />
              {this.props.book.info.author}
            </li>
            {this.props.chapters.map((chapter, i) => {
              return (
                <li
                  key={i}
                  className='chapter-heading'
                  style={m(
                    this.styles.chapterHeading,
                    chapter.active && this.styles.chapterHeadingActive
                  )}>
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
export default NavBar