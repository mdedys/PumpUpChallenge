import Actions from '../constants/actions'

const initialState = {
  name : null,
  bio  : {
    description : null,
    isExpanded  : false
  },
  image: {
    link: null
  }
}

function user( state = initialState, action ) {
  switch ( action.type ) {

  case Actions.RECEIVE_USER_PROFILE:
    return {
      name: action.name,
      bio: {
        description: action.bio,
        isExpanded: false
      },
      image: {
        link: action.thumbnailLink
      }
    }

  default:
    return state
  }
}

export default user
