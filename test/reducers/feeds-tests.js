import should      from 'should'

import Actions     from '../../src/constants/actions'
import FeedsReducer from '../../src/reducers/feeds'

describe( 'FeedsReducer', () => {

  it ( 'should return initial state', () => {
    FeedsReducer( undefined, {} ).should.deepEqual( {} )
  })

  it ( 'should handle RECEIVE_FEED_PHOTOS', () => {

    const expectedState = {
      1 : {
        photoList : [1,2,3,4,5],
        isLoaded  : true
      }
    }

    const action = {
      type          : Actions.RECEIVE_FEED_PHOTOS,
      id            : 1,
      photoList     : [1,2,3,4,5]
    }

    FeedsReducer( {}, action ).should.deepEqual( expectedState )
  })
})