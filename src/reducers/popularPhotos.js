import Actions from '../constants/actions'

export default PopularPhotos

const initialState = {
  photos: []
}

function PopularPhotos( state = initialState, action ) {
  switch ( action.type ) {

  case Actions.RECEIVE_POPULAR_PHOTOS:
    return {
      photoList : action.photoList
    }

  default:
    return state
  }
}
