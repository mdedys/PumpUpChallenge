import API from '../../constants/api'

export default {
  createUrl: createUrl,
  createPayload: createPayload
}

function createUrl( routeEndpoint, param ) {
  if ( !param ) {
    return API.endpoints.base + routeEndpoint
  }

  return API.endpoints.base + routeEndpoint + param
}

function createPayload( payload ) {
  return Object.assign( {}, API.info, payload )
}
