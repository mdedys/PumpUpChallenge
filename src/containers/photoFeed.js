import { connect }    from 'react-redux'
import PhotoActions    from '../actions/photos'
import Carousel       from '../components/photoFeed/carousel'

const mapStateToProps = ( { feed } ) => {
  return {
    activePhoto: feed.byId[feed.active],
    photoList: feed.photoList
  }
}

const mapDispatchToProps = ( dispatch ) => {
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
