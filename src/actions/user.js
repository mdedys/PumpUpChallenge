import UserService from '../services/user'
import Actions     from '../constants/actions'
import Logger      from'../utils/logger'

export default {
  fetchProfile: fetchProfile
}

function recieveProfile( user ) {
  Logger.log( 'Received user profile.' )

  return {
    type: Actions.RECEIVE_USER_PROFILE,
    name: user.name,
    bio: user.bio,
    thumbnailLink: user.profileThumbnail
  }
}

function fetchProfile() {
  Logger.log( 'Fetching user profile.' )

  return dispatch => {
    return UserService
      .fetchProfile()
      .then( response => dispatch( recieveProfile( response ) ) )
      .catch( error => {
        Logger.warn( error )
      })
  }
}
