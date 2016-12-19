import nock               from 'nock'
import should             from 'should'

import MockServices     from '../utils/mockServices'
import UserService      from '../../src/services/user'

describe( 'UserService', () => {

  describe( 'UserService.fetchUserProfile', () => {

    afterEach( () => {
      nock.cleanAll()
    })

    it( 'should receive successful response', () => {

      MockServices
        .mockFetchProfile()
        .reply( 200, { success: true } )

      return UserService
        .fetchProfile()
        .then( response => {
          response.success.should.be.true
        })
    })

    it( 'should catch failed request', () => {

      MockServices
        .mockFetchProfile()
        .reply( 404 )

      return UserService
        .fetchProfile()
        .catch( err => {
          err.status.should.equal( 404 )
        })
    })

  })

})

