import React, { PureComponent, PropTypes } from 'react'
import injectSheet from 'react-jss'
import ContainersWrapper from '../wrappers/ContainersWrapper'
import NavBar from './NavBar.jsx'

const styles = {
  audioContainer: {
    display: 'none'
  },
  reader: {
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'justify',
    fontSize: '1.3rem',
    fontFamily: '\'Cormorant Garamond\', Garamond, Georgia, serif',
    width: '100%',
    marginTop: '6rem',
    marginBottom: '3rem'
  },
  '@media(min-width: 668px)': {
    reader: {
      maxWidth: '600px'
    }
  }
}

class Book extends PureComponent {
  static propTypes = {
    audioOn: PropTypes.bool.isRequired,
    autoscroll: PropTypes.bool.isRequired,
    book: PropTypes.object.isRequired,
    chapters: PropTypes.array.isRequired,
    timestamp: PropTypes.number.isRequired,
    timeUpdate: PropTypes.func.isRequired,
    seek: PropTypes.func.isRequired,
    refPlayer: PropTypes.func.isRequired,
    mountBookAndAssets: PropTypes.func.isRequired,
    setActiveChapterWithScroll: PropTypes.func.isRequired
  }

  render () {
    const classes = this.props.sheet.classes
    return (
      <div>
        <div
          id='audio-container'
          className={classes.audioContainer}>
          <audio
            preload='metadata'
            {...(this.props.book.audioSrc && { src: this.props.book.assetsLocation + 'audio/' + this.props.book.audioSrc })}
            onTimeUpdate={(e) => {
              this.props.timeUpdate(e, this.props.bookViewer, this.props.autoscroll)
            }}
            ref={(node) => {
              this.player = node
            }} />
        </div>
        <NavBar
          book={this.props.book}
          chapters={this.props.chapters}
        />
        <div
          id='reader'
          className={classes.reader}>
          <ContainersWrapper
            seek={this.props.seek}
          />
        </div>
      </div>
    )
  }

  componentWillMount () {
    this.props.mountBookAndAssets(this.props.path)
  }

  componentDidMount () {
    this.props.refPlayer(this.player)
    window.addEventListener('scroll', () => this.props.setActiveChapterWithScroll(window.scrollY))
  }
}

export default injectSheet(styles)(Book)
