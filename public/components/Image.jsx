/* global URL */
import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getMedia } from '../services/book-service'
import m from './m'

class Image extends React.Component {
  constructor (props) {
    super(props)
    this.mixins = [PureRenderMixin]
    this.state = {
      src: ''
    }
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
        {...(this.state.src && { src: this.state.src })}
      />
    )
  }

  componentWillMount () {
    getMedia(this.props.imagesLocation + this.props.image.src, (response) => {
      this.setState({ src: URL.createObjectURL(response) })
    })
  }
}

Image.propTypes = {
  image: PropTypes.object.isRequired
}

export default Image
