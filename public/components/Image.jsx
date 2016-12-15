import React, { PureComponent, PropTypes } from 'react'
import injectSheet from 'react-jss'

const styles = {
  image: {
    width: '100%'
  }
}

class Image extends PureComponent {
  static propTypes = {
    image: PropTypes.object.isRequired,
    imagesLocation: PropTypes.string.isRequired
  }
  render () {
    const classes = this.props.sheet.classes
    return (
      <img
        className={classes.image}
        {...(this.props.image.src && { src: this.props.imagesLocation + this.props.image.src })}
      />
    )
  }
}

export default injectSheet(styles)(Image)
