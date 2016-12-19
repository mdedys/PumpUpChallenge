import Request from './helpers/request'
import ApiHelpers from './helpers/api'
import API from '../constants/api'

export default {
  fetchProfile: fetchProfile
}

function fetchProfile() {

  let url = ApiHelpers.createUrl( API.endpoints.userProfile, '318381' )
  let payload = ApiHelpers.createPayload( { '_method': 'GET' } )
  return Request.post( url, payload )
}
