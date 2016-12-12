import React, { PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import LineWrapper from '../wrappers/LineWrapper'
import Flourish from './Flourish.jsx'
import Image from './Image.jsx'
import m from './m'

class Container extends React.Component {
  constructor (props) {
    super(props)
    this.mixins = [PureRenderMixin]
    this.styles = {
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
  }

  render () {
    return (
      <div className='page-item'>
        {(this.props.container[0].lineType === 'normal') &&
          <span
            className='indent'
            style={m(this.styles.indent)}
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
                className='chapter-heading'
                style={m(this.styles.chapterHeading)}
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

Container.propTypes = {
  container: PropTypes.array.isRequired,
  chapters: PropTypes.array.isRequired,
  seek: PropTypes.func.isRequired,
  refChapterHeading: PropTypes.func.isRequired
}

export default Container
