import Actions from '../constants/actions'

export default PopularPhotos

const initialState = {
  photoList : [],
  isLoaded  : false
}

function PopularPhotos(state = initialState, action) {
  switch (action.type) {

  case Actions.RECEIVE_POPULAR_PHOTOS:
    return {
      photoList : action.photoList,
      isLoaded  : true
    }

  default:
    return state
  }
}
