import { createSelector } from 'reselect'

const getPhotos = (state) => state.popularPhotos

function sortDateByLatest(first, second) {
  return second.createdAt - first.createdAt
}

export const getPopularPhotos = createSelector(
  [getPhotos],
  function(popularPhotos) {

    let sortedPhotoList = popularPhotos.photoList.sort(sortDateByLatest)

    return {
      photoList : sortedPhotoList,
      isLoaded  : popularPhotos.isLoaded
    }
  }
)
