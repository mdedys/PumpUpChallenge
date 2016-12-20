import Actions      from '../constants/actions'
import PhotoService from '../services/photos'
import Logger       from '../utils/logger'

export default {
  fetchFeedPhotos: fetchFeedPhotos,
  fetchPopularPhotos: fetchPopularPhotos
}


 /**
 * Will receive photos and return an action with the formatted photolist
 * 
 * @param  {Object} response The photo request response
 * @param  {String} type The action type
 * 
 * @return {Object} Object containing the action type and formattaed photolist
 */
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


 /**
 * Will trigger an async request to fetch user feed photos
 * If successful with call receivePhotos to dispatch the results to the
 * store
 *
 * @return {Object} TODO
 */
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


 /**
 * Will trigger an async request to fetch popular photos
 * If successful with call receivePhotos to dispatch the results to the
 * store
 *
 * @return {Object} TODO
 */
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



