import React, { PureComponent, PropTypes } from 'react'
import injectSheet from 'react-jss'
import LineWrapper from '../wrappers/LineWrapper'
import Flourish from './Flourish.jsx'
import Image from './Image.jsx'

const styles = {
  indent: {
    paddingRight: '1rem',
    paddingLeft: '1rem'
  },
  chapterHeading: {
    fontSize: '2rem',
    textAlign: 'center',
    marginTop: '1rem',
    marginBottom: '1rem'
  }
}

class Container extends PureComponent {
  static propTypes = {
    container: PropTypes.array.isRequired,
    chapters: PropTypes.array.isRequired,
    seek: PropTypes.func.isRequired,
    refChapterHeading: PropTypes.func.isRequired
  }

  render () {
    const classes = this.props.sheet.classes
    return (
      <div className='page-item'>
        {(this.props.container[0].lineType === 'normal') &&
          <span
            className={classes.indent}
          />
        }
        {this.props.container.map((lineItem, i) => {
          if (lineItem.type === 'flourish') return <Flourish key={i} />
          if (lineItem.type === 'image') {
            return (
              <Image
                key={i}
                image={lineItem}
                imagesLocation={this.props.imagesLocation}
              />
            )
          }
          if (lineItem.type === 'chapterheading') {
            return (
              <div
                key={i}
                className={classes.chapterHeading}
                ref={(node) => {
                  this.chapterHeading = node
                }}>
                {lineItem.title}
              </div>
            )
          }
          return (
            <LineWrapper
              key={i}
              seek={this.props.seek}
              line={lineItem}
            />
          )
        })}
      </div>
    )
  }

  componentDidMount () {
    if (this.chapterHeading) this.props.refChapterHeading(this.chapterHeading, this.props.container[0].title)
  }
}

export default injectSheet(styles)(Container)
