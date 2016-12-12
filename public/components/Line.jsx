import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import m from './m'

class Line extends React.Component {
  constructor (props) {
    super(props)
    this.mixins = [PureRenderMixin]
    this.styles = {
      whitespace: {
        paddingLeft: '0.1rem',
        paddingRight: '0.2rem'
      },
      lineActive: {
        backgroundColor: '#FFCC66'
      },
      lineFormatted: {
        fontStyle: 'italic',
        marginTop: '1rem'
      }
    }
  }

  render () {
    return (
      <span
        className={`line-container${(this.props.line.active ? ' active' : '')}`}>
        <a
          style={m(
            (this.props.line.active && this.props.audioOn) && this.styles.lineActive,
            this.props.line.lineType === 'formatted' && this.styles.lineFormatted
            )}
          onClick={() => this.props.lineHandler(this.props.player, this.props.line.timestampStart)}>
          {(this.props.line.content.includes('\n'))
            ? this.props.line.content.split('\n').map((piece, i) => {
              return (
                <span key={i}>{piece}<br /></span>
              )
            })
            : this.props.line.content
          }
        </a>
        <span className='whitespace' style={m(this.styles.whitespace)} />
      </span>
    )
  }
}

Line.propTypes = {
  audioOn: PropTypes.bool.isRequired,
  line: PropTypes.object.isRequired,
  lineHandler: PropTypes.func.isRequired
}

export default Line
