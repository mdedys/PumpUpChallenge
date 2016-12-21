import { createSelector } from 'reselect'

const getFeed = (userFeed) => userFeed

export const getUserFeed = createSelector(
  [getFeed],
  function(userFeed) {

    if ( !userFeed ) {
      return { isLoaded: false }
    }

    return {
      photoList : userFeed.photoList,
      isLoaded  : userFeed.isLoaded
    }
  }
)