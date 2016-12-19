import { createSelector } from 'reselect'

const getPhotos = ( state ) => state.popularPhotos

export const getPopularPhotos = createSelector(
  [getPhotos],
  function( popularPhotos ) {
    return {
      photoList : popularPhotos.photoList,
      isLoaded  : popularPhotos.isLoaded
    }
  }
)
