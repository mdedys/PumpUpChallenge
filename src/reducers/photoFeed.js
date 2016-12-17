import Actions from '../constants/actions'

export default feedPhotos

const initialState = {
  photoList : [],
  byId       : {},
  active     : 0
}

function feedPhotos( state = initialState, action ) {
  switch ( action.type ) {

  case Actions.RECEIVE_FEED_PHOTOS: {

    let photoList = []
    let idToPhotoMap = {}

    action.photos.forEach( photo => {

      photoList.push( photo.objectId )

      idToPhotoMap[photo.objectId] = {
        id        : photo.objectId,
        link      : photo.thumbnail,
        createdAt : photo.createdAt
      }
    })

    return {
      photoList : photoList,
      byId      : idToPhotoMap,
      active    : photoList[0]
    }
  }

  case Actions.UPDATE_FEED_PHOTO: {
    return {
      photoList : state.photoList,
      byId      : state.byId,
      active    : state.byId[action.photoId].id
    }
  }

  default:
    return state
  }
}
