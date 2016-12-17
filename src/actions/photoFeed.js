import Actions     from '../constants/actions'
import UserService from '../services/user'

export default {
  setPhoto: setPhoto,
  fetchPhotos: fetchPhotos
}

function setPhoto( photoId ) {
  console.log( 'Set Photo' )
  return {
    type    : Actions.UPDATE_FEED_PHOTO,
    photoId : photoId
  }
}

function receivePhotos( response ) {
  console.log( response )
  return {
    type: Actions.RECEIVE_FEED_PHOTOS,
    photos: response.result.posts
  }
}

function fetchPhotos() {
  return dispatch => {
    return UserService
      .fetchFeedPhotos()
      .then( response => dispatch( receivePhotos( response ) ) )
  }
}

