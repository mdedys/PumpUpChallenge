import { createSelector } from 'reselect'

import TextParser         from '../utils/textParser'

const getBioDescription = ( state ) => state.user.bio.description

export const getParsedBio = createSelector(
  [ getBioDescription ],
  function( bio ) {

    if ( !bio ) {
      return null
    }

    let parsedBio = TextParser.replaceHashTags( bio )
    parsedBio = TextParser.replaceMentions( parsedBio )
    return parsedBio
  }
)

