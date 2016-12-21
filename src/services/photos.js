import Request     from './helpers/request'
import API         from '../constants/api'
import ApiHelpers  from './helpers/api'

export default {
  fetchFeedPhotos: fetchFeedPhotos,
  fetchPopularPhotos: fetchPopularPhotos
}


/**
 * Async fetch feed photos for a user
 * 
 * @return {Promise} A promise containing the request to fetch feed photos
 */
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


/**
 * Aync fetch popular photos
 * 
 * @return {Promise} A promise containing the request to fetch popular photos.
 */
function fetchPopularPhotos() {
  let url = ApiHelpers.createUrl( API.endpoints.popularPhotos )

  let payload = ApiHelpers.createPayload({
    'isThumbnailsOnly' : true,
    'limit'            : 18,
    '_method'          : 'POST',
  })

  return Request.post( url, payload )
}


