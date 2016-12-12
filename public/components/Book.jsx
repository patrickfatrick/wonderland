import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ContainersWrapper from '../wrappers/ContainersWrapper'
import NavBar from './NavBar.jsx'
import m from './m'

class Book extends React.Component {
  constructor (props) {
    super(props)
    this.mixins = [PureRenderMixin]
    this.styles = {
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
      readerLargeScreen: {
        maxWidth: '600px'
      }
    }
  }

  render () {
    return (
      <div>
        <div id='audio-container' style={m(this.styles.audioContainer)}>
          <audio
            autoPlay
            {...(this.props.audioSrc && { src: this.props.audioSrc })}
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
          style={m(
            this.styles.reader,
            document.body.clientWidth >= 668 && this.styles.readerLargeScreen
          )}>
          <ContainersWrapper
            seek={this.props.seek}
          />
        </div>
      </div>
    )
  }

  componentWillMount () {
    this.props.updateLocations(this.props.path)
    .then(() => {
      this.props.mountBookFile(this.props.book.bookLocation)
    })
  }

  componentDidMount () {
    this.props.refPlayer(this.player)
    window.addEventListener('scroll', () => this.props.setActiveChapterWithScroll(window.scrollY))
  }
}

Book.propTypes = {
  audioOn: PropTypes.bool.isRequired,
  audioSrc: PropTypes.string.isRequired,
  autoscroll: PropTypes.bool.isRequired,
  book: PropTypes.object.isRequired,
  chapters: PropTypes.array.isRequired,
  timestamp: PropTypes.number.isRequired,
  timeUpdate: PropTypes.func.isRequired,
  seek: PropTypes.func.isRequired,
  refPlayer: PropTypes.func.isRequired,
  updateLocations: PropTypes.func.isRequired,
  setActiveChapterWithScroll: PropTypes.func.isRequired
}

export default Book
