import Actions        from '../../src/constants/actions'
import UserReducer    from '../../src/reducers/user'
import { getProfile } from '../../src/selectors/user'



describe( 'UserSelectors', () => {

  describe( 'UserSelectors.getProfile', () => {

    it ( 'should not preform duplicate recomputations', () => {

      const commonInfo = {
        type          : Actions.RECEIVE_USER_PROFILE,
        bio           : 'test\nbio',
        thumbnailLink : 'link'
      }

      const firstUser = Object.assign(
        {},
        commonInfo,
        { id: 1, name: 'first user' }
      )

      const secondUser = Object.assign(
        {},
        commonInfo,
        { id: 2, name: 'second user' }
      )

      const updatedFirstUser = Object.assign(
        {},
        commonInfo,
        { id: 1, name: 'updated name' }
      )

      const expectedProfile = {
        name          : 'first user',
        bio           : 'test\nbio',
        summarizedBio : [ 'test', 'bio' ],
        thumbnailLink : 'link',
        isLoaded      : true
      }

      let state  = UserReducer( state, firstUser )
      let result = getProfile( state[1] )

      result.should.deepEqual( expectedProfile )
      getProfile.recomputations().should.equal( 1 )

      state  = UserReducer( state, secondUser )
      result = getProfile( state[1] )

      result.should.deepEqual( expectedProfile )
      getProfile.recomputations().should.equal( 1 )

      state  = UserReducer( state, updatedFirstUser )
      result = getProfile( state[1] )

      getProfile.recomputations().should.equal( 2 )
    })
  })
})