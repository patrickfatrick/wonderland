import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Container from './Container.jsx'
import m from './m'

class Containers extends React.Component {
  constructor (props) {
    super(props)
    this.mixins = [PureRenderMixin]
    this.styles = {
      containers: {
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem'
      },
      containersLargeScreen: {
        paddingLeft: 0,
        paddingRight: 0
      }
    }
  }

  render () {
    return (
      <div
        id='containers'
        style={m(
          this.styles.containers,
          document.body.clientWidth >= 668 && this.styles.containersLargeScreen
        )}
        ref={(el) => {
          this.bookViewerElement = el
        }}>
        {this.props.pageItems.map((pageItem, i) => {
          return (
            <Container
              key={i}
              container={pageItem}
              chapters={this.props.chapters}
              seek={this.props.seek}
              imagesLocation={this.props.imagesLocation}
              refChapterHeading={this.props.refChapterHeading}
            />
          )
        })}
      </div>
    )
  }

  componentDidMount () {
    this.props.refBookViewer(this.bookViewerElement)
  }
}

Containers.propTypes = {
  chapters: PropTypes.array.isRequired,
  pageItems: PropTypes.array.isRequired,
  seek: PropTypes.func.isRequired,
  refBookViewer: PropTypes.func.isRequired,
  imagesLocation: PropTypes.string.isRequired
}

export default Containers
