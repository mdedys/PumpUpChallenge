import Actions from '../constants/actions'

const initialState = {
  name: null,
  bio: {
    description: null,
    isExpanded: false
  },
  image: {
    thumbnail: {
      link: null,
      data: null,
      isFetching: false,
    },
    highResolution: {
      link: null,
      data: null,
      isFetching: false
    }
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
        thumbnail: {
          link: action.thumbnailLink,
          data: null,
          isFetching: false
        },
        highResolution: {
          link: action.highResolutionLink,
          data: null,
          isFetching: false
        }
      }
    }

  default:
    return state
  }
}

export default user
