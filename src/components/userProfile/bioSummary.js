import React, { PropTypes } from 'react'
import TagParser            from '../../utils/tagParser'

import './bioSummary.scss'
const maxLines  = 3
class BioSummary extends React.Component {

  ////////////////////
  // PROPS & STATES //
  ////////////////////

  static propTypes = {
    children   : PropTypes.array,
    isExpanded : PropTypes.bool,
    onReadMore : PropTypes.func
  }

  constructor() {
    super()

    this.state = { summarizerWidth: null }

    this.resize = this.resize.bind( this )
    this.readMore = this.readMore.bind( this )
  }



  ////////////////
  // RENDERINGS //
  ////////////////

  renderText() {

    if ( this.props.children.length === 0 ) {
      return []
    }

    let linesFilled   = 1
    let textLines     = [...this.props.children]
    let linesOfText   = []

    while ( linesFilled <= maxLines ) {
      let currentLine = textLines.shift()

      if ( currentLine === null ) {
        break
      }

      let lineLength       = 0
      let lineText       = ''
      let existingLineText = ''

      let shouldAppendToLine = linesFilled === linesOfText.length

      if ( shouldAppendToLine ) {
        existingLineText = linesOfText[linesFilled - 1]
        lineText = existingLineText + currentLine
      }
      else {
        lineText = currentLine
      }

      lineLength = this.measureText( lineText )
      let isTextTooLong = lineLength > this.state.summarizerWidth

      if ( lineLength < this.state.summarizerWidth && shouldAppendToLine) {
        linesOfText[linesFilled - 1] = lineText
        continue
      }
      else if ( !isTextTooLong ) {
        linesOfText.push(
          lineText
        )
        continue
      }

      let isLastLine = linesFilled === maxLines
      let trimObject = this.trimLine( lineText, lineLength, isLastLine )

      if ( !isLastLine ) {
        textLines = [trimObject.leftOverText, ...textLines]
      }

      if ( shouldAppendToLine ) {
        linesOfText[linesFilled - 1] = trimObject.newLine
      } else {
        linesOfText.push( trimObject.newLine )
      }

      linesFilled++
    }

    return this.buildText( linesOfText )
  }

  trimLine( lineText, lineLength, isLastLine ) {
    let newLine       = ''
    let leftOverWords = []
    let curLineLength = lineLength

    let words = lineText.split( ' ' )

    while ( curLineLength > this.state.summarizerWidth ) {
      let lastWord = words.pop()
      leftOverWords.push( lastWord )
      newLine = words.join( ' ' )

      let lineWithTail = isLastLine ? newLine + '... read more' : newLine
      curLineLength = this.measureText( lineWithTail )
    }

    let leftOverText = ''
    if ( !isLastLine ) {
      leftOverText = ' ' + leftOverWords.reverse().join( ' ' )
    }

    return {
      newLine: newLine,
      leftOverText: leftOverText
    }
  }

  buildText( linesOfText ) {
    return linesOfText.map( ( line, index ) => {
      return (
        <span key = { 'line-' + index } >
          { TagParser.convertTags( line ) }
        </span>
      )
    })
  }

  render() {

    const { children } = this.props

    if ( this.state.summarizerWidth && !this.props.isExpanded ) {

      return (
        <div className = 'bio-summary' ref = 'summarizer'>
           {this.renderText()}
          <span>... <a className = 'read-more' onClick = { this.readMore } >read more</a></span>
        </div>
      )

    }

    return (
      <div className = 'bio-summary expanded' ref = 'summarizer'>
        {children.map( TagParser.convertTags )}
      </div>
    )
  }



  /////////////////////
  // LIFECYCLE HOOKS //
  /////////////////////

  componentDidMount() {
    let canvas = document.createElement( 'canvas' )
    this.canvas = canvas.getContext( '2d' )

    window.addEventListener( 'resize', this.resize )

    setTimeout( this.resize(), 200 )
  }

  componentWillUnmount() {
    window.removeEventListener( 'resize', this.resize )
  }



  ////////////////////
  // HELPER METHODS //
  ////////////////////

  resize() {

    if ( this.props.isExpanded ) {
      return
    }

    let summarizer = this.refs.summarizer

    let style = window.getComputedStyle( summarizer )

    let font = [
      style['font-weight'],
      style['font-style'],
      style['font-size'],
      style['font-family']
    ].join(' ')

    this.canvas.font = font

    this.setState(
      { summarizerWidth: summarizer.getBoundingClientRect().width }
    )
  }

  readMore() {
    if ( this.props.onReadMore ) {
      this.props.onReadMore()
    }
  }

  measureText( text ) {
    return this.canvas.measureText( text ).width
  }

}

export default BioSummary
