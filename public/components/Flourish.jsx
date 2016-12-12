import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import m from './m'

export default class Flourish extends React.Component {
  constructor (props) {
    super(props)
    this.mixins = [PureRenderMixin]
    this.styles = {
      flourish: {
        textAlign: 'center'
      },
      star: {
        marginLeft: '1rem',
        marginRight: '1rem'
      },
      spacer: {
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem'
      }
    }
  }

  render () {
    return (
      <div
        style={m(this.styles.flourish)}>
        <div
          className='spacer'
          style={m(this.styles.spacer)}
        />
        <div>{[...Array(5)].map((v, i) => <span style={m(this.styles.star)} key={i}>*</span>)}</div>
        <div>{[...Array(4)].map((v, i) => <span style={m(this.styles.star)} key={i}>*</span>)}</div>
        <div>{[...Array(5)].map((v, i) => <span style={m(this.styles.star)} key={i}>*</span>)}</div>
        <div
          className='spacer'
          style={m(this.styles.spacer)}
        />
      </div>
    )
  }
}
