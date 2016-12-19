import Actions      from '../constants/actions'
import PhotoService from '../services/photos'
import Logger       from'../utils/logger'

export default {
  fetchFeedPhotos: fetchFeedPhotos,
  fetchPopularPhotos: fetchPopularPhotos
}

function receivePhotos( response, type ) {
  Logger.log( 'Received photos of type: ' + type )

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
  Logger.log( 'Fetching feed photos.' )

  return dispatch => {
    return PhotoService
      .fetchFeedPhotos()
      .then( response => dispatch(
          receivePhotos( response, Actions.RECEIVE_FEED_PHOTOS )
        )
      )
      .catch( error => {
        Logger.warn( error )
      })
  }
}

function fetchPopularPhotos() {
  Logger.log( 'Fetching popular photos.' )

  return dispatch => {
    return PhotoService
      .fetchPopularPhotos()
      .then( response => dispatch(
          receivePhotos( response, Actions.RECEIVE_POPULAR_PHOTOS )
        )
      )
      .catch( error => {
        Logger.warn( error )
      })
  }
}



