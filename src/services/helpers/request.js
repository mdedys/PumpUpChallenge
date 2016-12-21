import Promise from 'bluebird'
import Request from 'superagent'

export default {
  post: post
}


/**
 * Will send a post request with the given endpoint to the url and resolve or reject
 * the promise if the request was successful or not
 *
 * @param  {String} url The endpoint for the post request
 * @param  {String} payload The payload to send with the request
 *
 * @return {Promise} Promise containing the post request
 */
function post(url, payload) {
  return new Promise( (resolve, reject) => {
    Request
      .post(url)
      .send(payload)
      .end( (err, res) => {

        if (err) {
          reject( err || {} )
          return
        }

        resolve( res.body || {} )
      })
  })
}