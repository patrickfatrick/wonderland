import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'

const styles = {
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

class Flourish extends PureComponent {
  render () {
    const classes = this.props.sheet.classes
    return (
      <div
        className={classes.flourish}>
        <div
          className={classes.spacer}
        />
        <div>{[...Array(5)].map((v, i) => <span className={classes.star} key={i}>*</span>)}</div>
        <div>{[...Array(4)].map((v, i) => <span className={classes.star} key={i}>*</span>)}</div>
        <div>{[...Array(5)].map((v, i) => <span className={classes.star} key={i}>*</span>)}</div>
        <div
          className={classes.spacer}
        />
      </div>
    )
  }
}

export default injectSheet(styles)(Flourish)
