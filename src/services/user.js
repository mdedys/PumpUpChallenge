import Request from './helpers/request'
import ApiHelpers from './helpers/api'
import API from '../constants/api'

export default {
  fetchProfile: fetchProfile
}


/**
 * Async fetches a user profile
 * 
 * @return {Promise} A promise containing a post request to fetchUserProfile
 */
function fetchProfile() {

  let url = ApiHelpers.createUrl( API.endpoints.userProfile, '318381' )
  let payload = ApiHelpers.createPayload( { '_method': 'GET' } )
  return Request.post( url, payload )
}
