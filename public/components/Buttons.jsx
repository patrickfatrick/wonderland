import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import injectSheet from 'react-jss'
import classNames from 'classnames'

const styles = {
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
    borderRadius: '4px',
    '&:active': {
      backgroundColor: '#c1c1c1'
    }
  },
  buttonDisabled: {
    backgroundColor: '#c1c1c1'
  }
}

class Buttons extends React.Component {
  constructor (props) {
    super(props)
    this.mixins = [PureRenderMixin]
  }

  render () {
    const classes = this.props.sheet.classes
    return (
      <div
        id='button-container'
        className={classes.buttonContainer}>
        <button
          id='control-audio-button'
          title='Control Audio'
          className={classNames({
            [classes.button]: true,
            [classes.buttonDisabled]: this.buffering(this.props.audioPlayer.element)
          })}
          onClick={() => this.props.toggleAudio(this.props.audioPlayer.element, !this.props.audioOn)}>
          {this.buffering(this.props.audioPlayer.element) ? 'Loading...' : ((this.props.audioOn) ? 'Pause' : 'Play')}
        </button>
        {(this.props.audioOn) &&
          <button
            id='closed-captions-scroll-button'
            title='Auto-Scroll'
            className={classes.button}
            onClick={() => this.props.toggleAutoscroll(!this.props.autoscroll)}>
            {(this.props.autoscroll) ? 'Disable' : 'Enable' } Auto-Scroll
          </button>
        }
      </div>
    )
  }

  buffering (audio) {
    // Length should not be more than 1
    if (audio.buffered.length) {
      // Chrome behaves very strangely with buffer times while playing,
      // so this is as good as it gets for checking
      return audio.buffered.end(0) === 0
    }
    // Return true if audio is playing but we don't have a buffer yet
    if (!audio.paused) return true
    return false
  }
}

Buttons.propTypes = {
  audioPlayer: PropTypes.object.isRequired,
  audioOn: PropTypes.bool.isRequired,
  autoscroll: PropTypes.bool.isRequired,
  audioSrc: PropTypes.string.isRequired
}

export default injectSheet(styles)(Buttons)
