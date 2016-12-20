import Actions     from '../constants/actions'
import UserService from '../services/user'
import Logger      from '../utils/logger'

export default {
  fetchProfile: fetchProfile
}


 /**
 * Will receive the fetched userd and dispatch an action containing the user information
 * 
 * @param  {String} user The user that was fetched from the api
 * 
 * @return {Object} Object containing the action type and formatted user
 */
function recieveProfile( user ) {
  Logger.log( 'Received user profile.' )

  return {
    type: Actions.RECEIVE_USER_PROFILE,
    name: user.name,
    bio: user.bio,
    thumbnailLink: user.profileThumbnail
  }
}


 /**
 * Will trigger an async request to fetch the user profile
 * If successful will call receiveProfile to dispatch the results to the
 * store
 *
 * @return {Object} TODO
 */
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
