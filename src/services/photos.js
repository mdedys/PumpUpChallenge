import Request     from './helpers/request'
import API         from '../constants/api'
import ApiHelpers  from './helpers/api'

export default {
  fetchFeedPhotos: fetchFeedPhotos,
  fetchPopularPhotos: fetchPopularPhotos
}

function fetchFeedPhotos() {
  let url = ApiHelpers.createUrl( API.endpoints.feedPhotos )

  let payload = ApiHelpers.createPayload({
    'isThumbnailsOnly' : true,
    'limit'            : 5,
    'userId'           : 2707798,
    '_method'          : 'POST',
  })

  return Request.post( url, payload )
}

function fetchPopularPhotos() {
  let url = ApiHelpers.createUrl( API.endpoints.popularPhotos )

  let payload = ApiHelpers.createPayload({
    'isThumbnailsOnly' : true,
    'limit'            : 18,
    '_method'          : 'POST',
  })

  return Request.post( url, payload )
}


