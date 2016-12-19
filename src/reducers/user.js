import Actions from '../constants/actions'

const initialState = {
  profile: {
    name : null,
    bio: null,
    image: {
      thumbnail: null
    },
    isLoaded: false
  },
  feed: {
    photoList: [],
    isLoaded: false
  }
}

function user( state = initialState, action ) {
  switch ( action.type ) {

  case Actions.RECEIVE_USER_PROFILE:
    return {
      ...state,
      profile: {
        name: action.name,
        bio: action.bio,
        image: {
          thumbnail: action.thumbnailLink
        },
        isLoaded: true
      }
    }

  case Actions.RECEIVE_FEED_PHOTOS:
    return {
      ...state,
      feed: {
        photoList: action.photoList,
        isLoaded: true
      }
    }


  default:
    return state
  }
}

export default user
