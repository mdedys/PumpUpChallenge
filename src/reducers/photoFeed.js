import Actions from '../constants/actions'

export default feedPhotos

const initialState = {
  photoList     : [],
  byId          : {},
  activePhotoId : null
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
      photoList     : photoList,
      byId          : idToPhotoMap,
      activePhotoId : photoList[0]
    }
  }

  case Actions.UPDATE_FEED_PHOTO: {
    return {
      photoList     : state.photoList,
      byId          : state.byId,
      activePhotoId : state.byId[action.photoId].id
    }
  }

  default:
    return state
  }
}
