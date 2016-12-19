import { connect }               from 'react-redux'

import PhotoActions              from '../../actions/photos'
import Carousel                  from '../../components/photoFeed/carousel'

const mapStateToProps = function( state ) {
  return {
    photoList   : state.user.feed.photoList,
    isLoaded    : state.user.feed.isLoaded
  }
}

const mapDispatchToProps = function( dispatch ) {
  return {
    fetchPhotos: () => {
      dispatch( PhotoActions.fetchFeedPhotos() )
    },
    setPhoto: ( photoId ) => {
      dispatch( PhotoActions.setActiveFeedPhoto( photoId ) )
    }
  }
}

const photoFeed = connect(
  mapStateToProps,
  mapDispatchToProps
)( Carousel )

export default photoFeed
