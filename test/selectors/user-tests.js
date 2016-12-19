import { summarizeBio } from '../../src/selectors/user'

describe( 'UserSelectors', () => {


  describe( 'UserSelectors.summarizeBio', () => {

    it ( 'should summarize bio and create lines of text based on new lines', () => {
      const bio = 'This is line one\nThis is line two\nThis is line three'
      const state = {
        user: {
          profile: {
            bio: bio
          }
        }
      }

      const expectedLine1 = 'This is line one'
      const expectedLine2 = 'This is line two'
      const expectedLine3 = 'This is line three'

      const summarizedBio = summarizeBio( state )

      summarizedBio.should.have.size( 3 )
      summarizedBio[0].should.equal(expectedLine1)
      summarizedBio[1].should.equal(expectedLine2)
      summarizedBio[2].should.equal(expectedLine3)
    })

    it ( 'should handle consecutive new lines', () => {
      const bio = 'One\n\n\nTwo\n\nThree'
      const state = {
        user: {
          profile: {
            bio: bio
          }
        }
      }

      const summarizedBio = summarizeBio( state )
      summarizedBio.should.have.size( 6 )
      summarizedBio[1].should.equal( '' )
      summarizedBio[3].should.equal( 'Two' )
      summarizedBio[5].should.equal( 'Three' )
    })

    it ( 'should handle empty text', () => {

      const state = {
        user: {
          profile: {
            bio: ''
          }
        }
      }

      const summarizedBio = summarizeBio( state )
      summarizedBio.should.have.size( 0 )
    })
  })
})