import Actions from '../constants/actions'

export default feeds

function feeds(state = {}, action) {
  switch (action.type) {

  case Actions.RECEIVE_FEED_PHOTOS:
    return {
      ...state,
      [action.id] : {
        photoList : action.photoList,
        isLoaded  : true
      }
    }

  default:
    return state
  }
}


