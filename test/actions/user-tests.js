import configureMockStore from 'redux-mock-store'
import thunk              from 'redux-thunk'
import nock               from 'nock'
import should             from 'should'

import UserActions        from '../../src/actions/user'
import Actions            from '../../src/constants/actions'
import Api                from '../../src/constants/api'
import ApiHelpers         from '../../src/services/helpers/api'

const mockStore = configureMockStore( [thunk] )

describe( 'UserActions', () => {


  const expectedUser = {
    name: 'Test Name',
    bio: 'Test Bio',
    profileThumbnail: 'Test Link'
  }


  describe( 'UserActions.fetchProfile', () => {


    beforeEach( () => {

      nock( ApiHelpers.createUrl( Api.endpoints.userProfile, '318381' ) )
        .post( '', ApiHelpers.createPayload( { '_method': 'GET' } ) )
        .reply( 200, expectedUser )
    })


    afterEach( () => {
      nock.cleanAll()
    })


    it( 'should receive user profile', () => {

      const store = mockStore( {} )

      const expectedActions = {
        type: Actions.RECEIVE_USER_PROFILE,
        name: expectedUser.name,
        bio: expectedUser.bio,
        thumbnailLink: expectedUser.profileThumbnail
      }

      return store.dispatch( UserActions.fetchProfile() )
        .then( () => {
          store.getActions()[0].type.should.equal( expectedActions.type )
          store.getActions()[0].name.should.equal( expectedActions.name )
          store.getActions()[0].bio.should.equal( expectedActions.bio )
          store.getActions()[0].thumbnailLink.should.equal(
            expectedActions.thumbnailLink
          )
        })
    })

  })

})