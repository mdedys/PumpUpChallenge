import React, { PropTypes } from 'react'

import TagParser            from '../../utils/tagParser'

import './bioSummary.scss'

const MAX_LINES  = 3

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

    this.resize   = this.resize.bind( this )
    this.readMore = this.readMore.bind( this )
  }


  ////////////////
  // RENDERINGS //
  ////////////////



  /**
  * Will parse the user bio and generate 3 lines of texts. If the text is too long,
  * the text will be truncated and a read more button will be appened to allow the user to
  * expand the user bio.
  *
  * @return {Object[]} Will return an array of React Nodes with 3 lines of the user bio
  * and potentially a read more button if the text had to be truncated
  */
  renderText() {

    if (this.props.children.length === 0) {
      return []
    }

    let linesFilled   = 1
    let textLines     = [...this.props.children]
    let linesOfText   = []

    // Lines filled index starts at 1. For 3 lines of text we
    // need to increment MAX_LINES by 1
    let lastLine = MAX_LINES + 1

    while (linesFilled <= lastLine ) {
      let currentLine = textLines.shift() //Get the next line of text

      if (currentLine === null) {
        break
      }

      let lineLength       = 0
      let lineText       = ''
      let existingLineText = ''

      let shouldAppendToLine = linesFilled === linesOfText.length

      // If the current line is not full, append to the line otherwise set the line text
      if (shouldAppendToLine) {
        existingLineText = linesOfText[linesFilled - 1]
        lineText = existingLineText + currentLine
      }
      else {
        lineText = currentLine
      }

      lineLength = this.measureText(lineText)

      let isTextTooLong = lineLength >= this.state.summarizerWidth

      // If the current line is not full and the text fits update the current line
      if (!isTextTooLong && shouldAppendToLine) {
        linesOfText[linesFilled - 1] = lineText
        continue
      }
      // If the text is not too long create a new line of text
      else if (!isTextTooLong) {
        linesOfText.push(
          lineText
        )
        continue
      }

      let isLastLine = linesFilled === lastLine
      let trimObject = this.trimLine(lineText, lineLength, isLastLine)

      // Update the textLines with the left over words from the current line
      if (!isLastLine) {
        textLines = [trimObject.leftOverText, ...textLines]
      }

      if (shouldAppendToLine) {
        linesOfText[linesFilled - 1] = trimObject.newLine
      } else {
        linesOfText.push(trimObject.newLine)
      }

      linesFilled++
    }

    return this.buildText(linesOfText)
  }


  /**
  * Will take the current line and determine which words have to be trimmed in order for the line of
  * text to fit into one line. The result along with the truncated words will be returned.
  *
  * @param  {String} lineText The current line of text
  * @param  {Number} lineLength The current length of the line
  * @param  {Bool} isLastLine A flag to determine if the curren line is the last line
  *
  * @return {Object} Object containing the new line of text and the words that were truncated
  */
  trimLine(lineText, lineLength, isLastLine) {

    let newLine       = ''
    let leftOverWords = []
    let curLineLength = lineLength

    let words = lineText.split( ' ' )

    while (curLineLength >= this.state.summarizerWidth) {
      let lastWord = words.pop()

      if (!lastWord) {
        break;
      }

      leftOverWords.push( lastWord )
      newLine = words.join(' ')

      let lineWithTail = isLastLine ? newLine + '... read more' : newLine

      curLineLength = this.measureText(lineWithTail)
    }

    let leftOverText = ''
    if (!isLastLine) {
      leftOverText = ' ' + leftOverWords.reverse().join( ' ' )
    }

    return {
      newLine      : newLine,
      leftOverText : leftOverText
    }
  }


  /**
  * Will take the lines of text and generate React Node containing text.
  * Will also parse any hashtags or mentions
  *
  * @return {Object[]} Array of React Nodes that will be rendered
  */
  buildText(linesOfText) {
    return linesOfText.map( (line, index ) => {
      return (
        <span key = {'line-' + index} >
          { TagParser.convertTags( line ) }
        </span>
      )
    })
  }


  render() {

    const { children } = this.props

    if (this.state.summarizerWidth && !this.props.isExpanded) {

      return (
        <div className = 'bio-summary' ref = 'summarizer'>
           {this.renderText()}
          <span>... <a className = 'read-more' onClick = {this.readMore}>read more</a></span>
        </div>
      )

    }

    return (
      <div className = 'bio-summary expanded' ref = 'summarizer'>
        { children.map(TagParser.convertTags) }
      </div>
    )
  }


  /////////////////////
  // LIFECYCLE HOOKS //
  /////////////////////



  componentDidMount() {
    let canvas  = document.createElement('canvas')
    this.canvas = canvas.getContext('2d')

    let style = window.getComputedStyle(this.refs.summarizer)

    let font = [
      style['font-weight'],
      style['font-style'],
      style['font-size'],
      style['font-family']
    ].join(' ')

    this.canvas.font = font

    window.addEventListener('resize', this.resize)

    this.resize()
  }


  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }


  ////////////////////
  // HELPER METHODS //
  ////////////////////



  /**
  * Resize event handler that will updated the state of the width of the container
  */
  resize() {

    if (this.props.isExpanded) {
      return
    }

    let summarizer = this.refs.summarizer

    // Offset is needed for initial load where
    // width of the container is incorrect in some
    // browsers
    let offset = 0
    if (!this.state.summarizerWidth) {
      offset = 50
    }

    this.setState({
      summarizerWidth: summarizer.getBoundingClientRect().width - offset
    })
  }


  /**
  * Event handle for when the user will select the read more button. Will trigger the onReadMore callback
  */
  readMore() {
    if (this.props.onReadMore) {
      this.props.onReadMore()
    }
  }


  /**
  * Will measure the length of the text using the cached canvas
  *
  * @param  {String} text The text to be measured
  *
  * @return {Number} Width of the text
  */
  measureText(text) {
    return this.canvas.measureText(text).width
  }

}

export default BioSummary
