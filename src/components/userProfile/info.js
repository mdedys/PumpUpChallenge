import React, { PropTypes } from 'react'

import TextParser from '../../utils/textParser'

class Info extends React.Component {
  render() {

    const { name, bio } = this.props

    let parsedBio = null

    //TODO: truncate text and add see more
    if ( bio.description ) {
      parsedBio = TextParser.replaceHashTags( bio.description )
      parsedBio = TextParser.replaceMentions( parsedBio )
    }


    return (
      <div className = 'user-info' >
        <div className = 'user-info-name' >
          { name }
        </div>
        <div
          className = 'user-info-bio'
          dangerouslySetInnerHTML = { { __html: parsedBio } } />
      </div>
    )
  }
}

Info.propTypes = {
  name: PropTypes.string,
  bio: PropTypes.shape({
    description: PropTypes.string,
    isExpanded: PropTypes.bool
  })
}

export default Info
