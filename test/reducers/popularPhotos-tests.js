import should               from 'should'

import Actions              from '../../src/constants/actions'
import PopularPhotosReducer from '../../src/reducers/popularPhotos'

describe( 'PopularPhotosReducer', () => {
  it ( 'should return initial state', () => {

    const initialState = {
      photoList : [],
      isLoaded  : false
    }

    PopularPhotosReducer( undefined, {} )
      .should.deepEqual( initialState )
  })

  it ( 'should handle RECEIVE_POPULAR_PHOTOS', () => {

    const expectedState = {
      photoList : [1,2,3,4,5],
      isLoaded  : true
    }

    const action = {
      type      : Actions.RECEIVE_POPULAR_PHOTOS,
      photoList : [1,2,3,4,5],
    }

    PopularPhotosReducer( undefined, action )
      .should.deepEqual( expectedState )
  })

})