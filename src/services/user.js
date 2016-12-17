import Promise from 'bluebird'
import Request from 'superagent'

import API from '../constants/api'

export default {
  fetchProfile: fetchProfile,
  fetchFeedPhotos: fetchFeedPhotos
}

function fetchProfile() {

  let url = API.END_POINT + API.USER_PROFILE + '318381'

  let payload = generatePayload( { '_method': 'GET' } )

  return new Promise( function( resolve, reject ) {
    Request
      .post( url )
      .send( payload )
      .end( function( err, res ) {

        if ( err ) {
          reject( err || {} )
        }

        resolve( res.body || {} )
      })
  })
}

function fetchFeedPhotos() {
  let url = API.END_POINT + API.FEED_PHOTOS

  let payload = generatePayload({
    'isThumbnailsOnly' : true,
    'limit'            : 5,
    'userId'           : 2707798,
    '_method'          : 'POST',
  })

  return new Promise( function( resolve, reject ) {
    Request
      .post( url )
      .send( payload )
      .end( function( err, res ) {
        if ( err ) {
          reject( err || {} )
        }

        resolve( res.body || {} )
      })
  })
}

function generatePayload( payload ) {
  return Object.assign( {}, API.INFO, payload )
}
