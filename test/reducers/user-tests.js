import should      from 'should'

import UserReducer from '../../src/reducers/user'
import Actions     from '../../src/constants/actions'

describe( 'UserReducer', () => {
  it ( 'should return initial state', () => {

    const initialState = {
      profile: {
        name : null,
        bio: null,
        image: {
          thumbnail: null
        },
        isLoaded: false
      },
      feed: {
        photoList: [],
        isLoaded: false
      }
    }

    UserReducer( undefined, {} ).should.deepEqual( initialState )
  })

  it ( 'should handle RECEIVE_USER_PROFILE', () => {

    const expectedState = {
      profile: {
        name : 'test name',
        bio: 'test bio',
        image: {
          thumbnail: 'test link'
        },
        isLoaded: true
      },
      feed: {
        photoList: [],
        isLoaded: false
      }
    }

    const action = {
      type: Actions.RECEIVE_USER_PROFILE,
      name: 'test name',
      bio: 'test bio',
      thumbnailLink: 'test link'
    }

    UserReducer( undefined, action ).should.deepEqual( expectedState )
  })

  it ( 'should handle RECEIVE_FEED_PHOTOS', () => {

    const expectedState = {
      profile: {
        name : null,
        bio: null,
        image: {
          thumbnail: null
        },
        isLoaded: false
      },
      feed: {
        photoList: [1,2,3,4,5],
        isLoaded: true
      }
    }

    const action = {
      type: Actions.RECEIVE_FEED_PHOTOS,
      photoList: [1,2,3,4,5],
      isLoaded: true
    }

    UserReducer( undefined, action ).should.deepEqual( expectedState )
  })

})