import nock               from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk              from 'redux-thunk'
import should             from 'should'

import MockServices       from '../utils/mockServices'
import PhotoActions       from '../../src/actions/photos'
import Actions            from '../../src/constants/actions'

const mockStore = configureMockStore( [thunk] )

function assertPhotos( receivedAction, actionType, expectedObjectId ) {
  receivedAction.type.should.equal( actionType )
  receivedAction.photoList.length.should.equal( 1 )
  receivedAction.photoList[0].id.should.equal( expectedObjectId )
}

describe( 'PhotoActions', () => {

  const photoResponse = {
    result: {
      posts: [{
        objectId  : 1,
        thumbnail : 'Test Link',
        createdAt : 'Test Date'
      }]
    }
  }

  const expectedActions = {
    type: '',
    photoList: photoResponse.result.posts.map( photo => {
      return {
        id        : photo.objectId,
        link      : photo.thumbnail,
        createdAt : photo.createdAt
      }
    })
  }

  afterEach( () => {
    nock.cleanAll()
  })

  describe( 'PhotoActions.fetchFeedPhotos', () => {

    it( 'should receive user feed photos', () => {

      const store = mockStore( {} )
      const expectedObjectId = photoResponse.result.posts[0].objectId

       MockServices
        .mockFetchFeedPhotos()
        .reply( 200, photoResponse )

      expectedActions.type = Actions.RECEIVE_FEED_PHOTOS

      return store.dispatch( PhotoActions.fetchFeedPhotos() )
        .then( () => {

          assertPhotos(
            store.getActions()[0],
            expectedActions.type,
            expectedObjectId
          )

        })
    })
  })

  describe( 'PhotoActions.fetchFeedPhotos', () => {

    it( 'should receive popular photos', () => {

      const store = mockStore( {} )
      const expectedObjectId = photoResponse.result.posts[0].objectId

      MockServices
        .mockFetchPopularPhotos()
        .reply( 200, photoResponse )

      expectedActions.type = Actions.RECEIVE_POPULAR_PHOTOS

      return store.dispatch( PhotoActions.fetchPopularPhotos() )
        .then( () => {

          assertPhotos(
            store.getActions()[0],
            expectedActions.type,
            expectedObjectId
          )

        })
    })
  })
})

