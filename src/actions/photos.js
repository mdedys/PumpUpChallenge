import Actions     from '../constants/actions'
import PhotoService from '../services/photos'

export default {
  setActiveFeedPhoto: setActiveFeedPhoto,
  fetchFeedPhotos: fetchFeedPhotos,
  fetchPopularPhotos: fetchPopularPhotos
}

function setActiveFeedPhoto( index ) {
  console.info( 'Set feed to photoId index: ' + index )
  return {
    type    : Actions.UPDATE_FEED_PHOTO,
    newIndex : index
  }
}

function receivePhotos( response, type ) {
  console.log( 'Received photos of type: ' + type )

  return {
    type: type,
    photoList: response.result.posts.map( photo => {
      return {
        id        : photo.objectId,
        link      : photo.thumbnail,
        createdAt : photo.createdAt
      }
    })
  }
}

function fetchFeedPhotos() {
  console.log( 'Fetching feed photos.' )
  return dispatch => {
    return PhotoService
      .fetchFeedPhotos()
      .then( response => dispatch(
          receivePhotos( response, Actions.RECEIVE_FEED_PHOTOS )
        )
      )
  }
}

function fetchPopularPhotos() {
  console.log( 'Fetching popular photos.' )
  return dispatch => {
    return PhotoService
      .fetchPopularPhotos()
      .then( response => dispatch(
          receivePhotos( response, Actions.RECEIVE_POPULAR_PHOTOS )
        )
      )
  }
}



