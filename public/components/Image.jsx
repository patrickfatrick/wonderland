import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import m from './m'

class Image extends React.Component {
  constructor (props) {
    super(props)
    this.mixins = [PureRenderMixin]
    this.styles = {
      image: {
        width: '100%'
      }
    }
  }

  render () {
    return (
      <img
        style={m(this.styles.image)}
        {...(this.props.image.src && { src: this.props.imagesLocation + this.props.image.src })}
      />
    )
  }
}

Image.propTypes = {
  image: PropTypes.object.isRequired,
  imagesLocation: PropTypes.string.isRequired
}

export default Image
