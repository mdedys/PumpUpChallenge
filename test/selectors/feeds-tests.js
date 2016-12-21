import PhotoListGen    from '../utils/photoListGenerator'
import Actions         from '../../src/constants/actions'
import FeedsReducer    from '../../src/reducers/feeds'
import { getUserFeed } from '../../src/selectors/feeds'


describe( 'FeedsSelectors', () => {

  describe( 'FeedsSelectors.getUserFeed', () => {

    it ( 'should not preform duplicate recomputations', () => {

      const userOnePhotos = {
        type      : Actions.RECEIVE_FEED_PHOTOS,
        id        : 1,
        photoList : PhotoListGen.createPhotoList(),
        isLoaded  : true
      }

      const userTwoPhotos = {
        type      : Actions.RECEIVE_FEED_PHOTOS,
        id        : 2,
        photoList : PhotoListGen.createPhotoList(),
        isLoaded  : true
      }

      let state = FeedsReducer({}, userOnePhotos)
      let result = getUserFeed(state[1])

      result.photoList.should.equal(userOnePhotos.photoList)
      result.isLoaded.should.be.true()
      getUserFeed.recomputations().should.equal(1)

      state = FeedsReducer({}, userTwoPhotos)
      result = getUserFeed(state[2])

      result.photoList.should.equal(userTwoPhotos.photoList)
      result.isLoaded.should.be.true()
      getUserFeed.recomputations().should.equal(2)

      result = getUserFeed(state[2])
      getUserFeed.recomputations().should.equal(2)
    })
  })
})
