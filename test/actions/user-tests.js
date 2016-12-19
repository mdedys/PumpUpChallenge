import nock               from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk              from 'redux-thunk'
import should             from 'should'

import MockServices       from '../utils/mockServices'
import UserActions        from '../../src/actions/user'
import Actions            from '../../src/constants/actions'


const mockStore = configureMockStore( [thunk] )

describe( 'UserActions', () => {


  const expectedUser = {
    name: 'Test Name',
    bio: 'Test Bio',
    profileThumbnail: 'Test Link'
  }


  describe( 'UserActions.fetchProfile', () => {

    afterEach( () => {
      nock.cleanAll()
    })


    it( 'should receive user profile', () => {

      MockServices
        .mockFetchProfile()
        .reply( 200, expectedUser )

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