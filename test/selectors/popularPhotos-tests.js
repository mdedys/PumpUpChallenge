import PhotoListGen         from '../utils/photoListGenerator'
import Actions              from '../../src/constants/actions'
import PopularPhotosReducer from '../../src/reducers/popularPhotos'
import { getPopularPhotos } from '../../src/selectors/popularPhotos'


describe( 'PopularPhotosSelectors', () => {

  describe( 'PopularPhotosSelectors.getPopularPhotos', () => {

    it ( 'should not preform duplicate recomputations', () => {

      const popularPhotos = {
        type      : Actions.RECEIVE_POPULAR_PHOTOS,
        photoList : PhotoListGen.createPhotoList(),
        isLoaded  : true
      }

      let mockStore = {
        popularPhotos : {
          photoList : [],
          isLoaded  : false
        }
      }

      let state = {
        popularPhotos : {
          photoList : [],
          isLoaded  : false
        }
      }

      let result = getPopularPhotos( mockStore )

      result.photoList.length.should.equal( 0 )
      result.isLoaded.should.be.false()

      getPopularPhotos.recomputations().should.equal(1)

      state = PopularPhotosReducer( state, popularPhotos )
      mockStore.popularPhotos = state

      result = getPopularPhotos( mockStore )

      let photoOne = result.photoList[0]
      let photoTwo = result.photoList[1]

      photoOne.createdAt.should.be.greaterThan( photoTwo.createdAt )
      result.isLoaded.should.be.true()

      getPopularPhotos.recomputations().should.equal(2)

      result = getPopularPhotos( mockStore )

      getPopularPhotos.recomputations().should.equal(2)
    })
  })
})
