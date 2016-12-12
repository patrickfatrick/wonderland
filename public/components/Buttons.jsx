import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import m from './m'

class Buttons extends React.Component {
  constructor (props) {
    super(props)
    this.mixins = [PureRenderMixin]
    this.styles = {
      buttonContainer: {
        textAlign: 'center',
        display: 'inline-block',
        position: 'absolute',
        right: '30px',
        top: '23px'
      },
      button: {
        outline: 'none',
        marginLeft: '3px',
        marginRight: '3px',
        fontSize: '0.8rem',
        lineHeight: '0.8rem',
        cursor: 'pointer',
        border: '1px solid #919191',
        padding: '6px',
        minWidth: '1.5rem',
        minHeight: '1.5rem',
        textAlign: 'center',
        backgroundColor: 'white',
        color: '#666',
        borderLeft: '1px solid #919191',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        borderRadius: '4px'
      }
    }
  }

  render () {
    return (
      <div id='button-container' style={m(this.styles.buttonContainer)}>
        <button
          id='closed-captions-button'
          title='Closed Captions'
          style={m(this.styles.button)}
          onClick={() => this.props.toggleAudio(this.props.player, this.props.audioLocation, !this.props.audioOn)}>
          {(this.props.audioOn) ? 'Pause' : 'Play'}
        </button>
        {(this.props.audioOn) &&
          <button
            id='closed-captions-scroll-button'
            title='Auto-Scroll'
            style={m(this.styles.button)}
            onClick={() => this.props.toggleAutoscroll(!this.props.autoscroll)}>
            Turn {(this.props.autoscroll) ? 'off' : 'on' } Auto-Scroll
          </button>
        }
      </div>
    )
  }
}

Buttons.propTypes = {
  audioOn: PropTypes.bool.isRequired,
  autoscroll: PropTypes.bool.isRequired,
  audioLocation: PropTypes.string.isRequired
}

export default Buttons