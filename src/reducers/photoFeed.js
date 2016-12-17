import Actions from '../constants/actions'

export default feedPhotos

const initialState = {
  photoList   : [],
  activeIndex : null
}

function feedPhotos( state = initialState, action ) {
  switch ( action.type ) {

  case Actions.RECEIVE_FEED_PHOTOS: {
    return {
      photoList   : action.photoList,
      activeIndex : 0
    }
  }

  case Actions.UPDATE_FEED_PHOTO: {
    return {
      photoList   : state.photoList,
      activeIndex : action.newIndex
    }
  }

  default:
    return state
  }
}
