import { connect }    from 'react-redux'
import FeedActions    from '../actions/photoFeed'
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
      dispatch( FeedActions.fetchPhotos() )
    },
    setPhoto: ( photoId ) => {
      dispatch( FeedActions.setPhoto( photoId ) )
    }
  }
}

const photoFeed = connect(
  mapStateToProps,
  mapDispatchToProps
)( Carousel )

export default photoFeed
