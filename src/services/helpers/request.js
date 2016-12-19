import Request from 'superagent'
import Promise from 'bluebird'

export default {
  post: post
}

function post( url, payload ) {
  return new Promise( ( resolve, reject ) => {
    Request
      .post( url )
      .send( payload )
      .end( ( err, res ) => {

        if ( err ) {
          reject( err || {} )
          return
        }

        resolve( res.body || {} )
      })
  })
}