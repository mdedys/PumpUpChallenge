import { createSelector } from 'reselect'

const getUser = ( user ) => user

export const getProfile = createSelector(
  [getUser],
  function( user ) {

    if ( !user ) {
      return {
        isLoaded: false
      }
    }

    let summarizedBio = []
    if ( user.bio ) {
      summarizedBio = user.bio.split( '\n' )
    }

    return {
      name          : user.name,
      bio           : user.bio,
      summarizedBio : summarizedBio,
      thumbnailLink : user.image.thumbnail,
      isLoaded      : user.isLoaded
    }
  }
)
