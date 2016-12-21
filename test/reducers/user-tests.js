import should      from 'should'

import Actions     from '../../src/constants/actions'
import UserReducer from '../../src/reducers/user'

describe( 'UserReducer', () => {
  it ( 'should return initial state', () => {
    UserReducer( undefined, {} ).should.deepEqual( {} )
  })

  it ( 'should handle RECEIVE_USER_PROFILE', () => {

    const expectedState = {
      1: {
        id       : 1,
        name     : 'test name',
        bio      : 'test bio',
        image    : {
          thumbnail : 'test link'
        },
        isLoaded : true
      }
    }

    const action = {
      type          : Actions.RECEIVE_USER_PROFILE,
      id            : 1,
      name          : 'test name',
      bio           : 'test bio',
      thumbnailLink : 'test link'
    }

    UserReducer( {}, action ).should.deepEqual( expectedState )
  })
})