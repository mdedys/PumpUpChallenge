import UserService from '../services/user'
import Actions     from '../constants/actions'

export default {
  fetchProfile: fetchProfile
}

function recieveProfile( user ) {
  console.log( 'Received user profile.' )
  return {
    type: Actions.RECEIVE_USER_PROFILE,
    name: user.name,
    bio: user.bio,
    thumbnailLink: user.profileThumbnail,
    highResolutionLink: user.profileImage
  }
}

function fetchProfile() {
  console.log( 'Fetching user profile.' )
  return dispatch => {
    return UserService
      .fetchProfile()
      .then( response => dispatch( recieveProfile( response ) ) )
  }
}


