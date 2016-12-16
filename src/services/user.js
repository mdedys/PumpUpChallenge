import Promise from 'bluebird'
import Request from 'superagent'

import API from '../constants/api'

export default {
  fetchProfile: fetchProfile
}

function fetchProfile() {

  let url = `${API.END_POINT}/classes/User/318381`

  let payload = {
    '_method': 'GET',
    '_version': API.VERSION,
    '_SessionToken': API.SESSION_TOKEN
  }

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
