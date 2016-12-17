import { connect }               from 'react-redux'

import PhotoActions              from '../../actions/photos'
import Carousel                  from '../../components/photoFeed/carousel'

const mapStateToProps = function( state ) {
  return {
    activeIndex : state.feed.activeIndex,
    photoList   : state.feed.photoList
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
