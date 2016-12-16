import UserService from '../services/user'
import Actions     from '../constants/actions'

function recieveProfile( user ) {
  return {
    type: Actions.RECEIVE_USER_PROFILE,
    name: user.name,
    bio: user.bio,
    thumbnailLink: user.profileThumbnail,
    highResolutionLink: user.profileImage
  }
}

function fetchProfile() {
  return dispatch => {
    return UserService
      .fetchProfile()
      .then( response => dispatch( recieveProfile( response ) ) )
  }
}

export default {
  fetchProfile: fetchProfile
}
