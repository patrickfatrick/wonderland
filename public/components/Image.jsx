import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import injectSheet from 'react-jss'

const styles = {
  image: {
    width: '100%'
  }
}

class Image extends React.Component {
  constructor (props) {
    super(props)
    this.mixins = [PureRenderMixin]
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

Image.propTypes = {
  image: PropTypes.object.isRequired,
  imagesLocation: PropTypes.string.isRequired
}

export default injectSheet(styles)(Image)
