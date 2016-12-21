import Actions from '../constants/actions'

export default users

function users(state = {}, action) {

  switch (action.type) {

  case Actions.RECEIVE_USER_PROFILE:
    return {
      ...state,
      [action.id] : {
        id    : action.id,
        name  : action.name,
        bio   : action.bio,
        image : {
          thumbnail : action.thumbnailLink
        },
        isLoaded : true
      }
    }


  default:
    return state
  }
}


