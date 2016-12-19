import { createSelector } from 'reselect'

const getUser = ( state ) => state.user
const getUserFeed = ( state ) => state.user.feed

export const getUserProfile = createSelector(
  [getUser],
  function( user ) {
    let summarizedBio = []

    if ( user.profile.bio ) {
      summarizedBio = user.profile.bio.split( '\n' )
    }

    return {
      name          : user.profile.name,
      bio           : user.profile.bio,
      summarizedBio : summarizedBio,
      thumbnailLink : user.profile.image.thumbnail,
      isLoaded      : user.profile.isLoaded
    }
  }
)

export const getFeedPhotos = createSelector(
  [getUserFeed],
  function( feed ) {
    return {
      photoList: feed.photoList,
      isLoaded: feed.isLoaded
    }
  }
)
