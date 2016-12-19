import { createSelector } from 'reselect'

const getBio = ( state ) => state.user.profile.bio

export const summarizeBio = createSelector(
  [ getBio ],
  function( bio ) {
    if ( !bio ) {
      return []
    }
    return bio.split( '\n' )
  }
)

