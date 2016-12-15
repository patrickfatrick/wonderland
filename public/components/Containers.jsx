import React, { PureComponent, PropTypes } from 'react'
import Container from './Container.jsx'
import injectSheet from 'react-jss'

const styles = {
  containers: {
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem'
  },
  '@media (min-width: 668px)': {
    container: {
      paddingLeft: 0,
      paddingRight: 0
    }
  }
}

class Containers extends PureComponent {
  static propTypes = {
    chapters: PropTypes.array.isRequired,
    pageItems: PropTypes.array.isRequired,
    seek: PropTypes.func.isRequired,
    refBookViewer: PropTypes.func.isRequired,
    imagesLocation: PropTypes.string.isRequired
  }

  render () {
    const classes = this.props.sheet.classes
    return (
      <div
        id='containers'
        className={classes.containers}
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

export default injectSheet(styles)(Containers)
