import React                from 'react'

import { HASHTAG, MENTION } from '../constants/tags'

export default {
  convertTags: convertTags
}


/**
 * Creates the url and anchor element for the given hash tag or mention
 *
 * @param  {String} A hashtag or mention
 *
 * @return {Object} The anchor element for the converted tag
 */
function createLinkFromTag( tag ) {

  let url

  if ( tag[0] === HASHTAG ) {
    url = '//search.pumpup.com/hashtag?q=' + tag
  } else {
    url = '//search.pumpup.com/mention?q=' + tag
  }

  return (
    <a className = 'tag' href = { url } key = { tag } >
      { tag }
    </a>
  )
}


/**
 * Explains how to write a short block comment.
 *
 * @param  {String} A line of text that may contain a hashtag or mention
 *
 * @return {Object[]} An array of react nodes which contain the text and converted tagss 
 */
function convertTags(text) {

  if ( text === null ) {
    return null
  }

  // Return a space if text length is 0
  if ( text.length === 0 ) {
    return ' '
  }

  // No tags required to parse
  if ( text.indexOf( HASHTAG ) === -1 && text.indexOf( MENTION ) === -1 ) {
    return text
  }

  let startIndex = 0
  let curIndex   = 0
  let parsedLine = []

  while ( curIndex < text.length ) {

    if ( text[curIndex] === HASHTAG || text[curIndex] === MENTION ) {

      parsedLine.push( text.substring( startIndex, curIndex ) )

      startIndex = curIndex
      while ( curIndex < text.length && text[curIndex] !== ' ' ) {
        curIndex++
      }

      parsedLine.push(
        createLinkFromTag( text.substring( startIndex, curIndex ) )
      )

      startIndex = curIndex
    }
    curIndex++
  }

  parsedLine.push( text.substring( startIndex, curIndex ) )

  return parsedLine
}
