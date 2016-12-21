import API from '../../constants/api'

export default {
  createUrl: createUrl,
  createPayload: createPayload
}

/**
 * Explains how to write a short block comment.
 * @param  {String} route The api endpoint
 * @param  {String} param The route paramater
 * 
 * @return {String} The created url
 */
function createUrl( routeEndpoint, param ) {
  if ( !param ) {
    return API.endpoints.base + routeEndpoint
  }

  return API.endpoints.base + routeEndpoint + param
}


/**
 * Will create a payload containing the api version and session token 
 * @param  {Object} payload The request payload
 * 
 * @return {Object} The created payload
 */
function createPayload( payload ) {
  return Object.assign( {}, API.info, payload )
}
