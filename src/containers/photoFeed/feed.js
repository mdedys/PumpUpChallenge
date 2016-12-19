import React, { PropTypes }  from 'react'
import { connect }           from 'react-redux'

import PhotoActions          from '../../actions/photos'
import Carousel              from '../../components/photoFeed/carousel'
import LoadingSpinner        from '../../components/loadingSpinner'
import { getFeedPhotos }     from '../../selectors/user'

import './feed.scss'

class PhotoFeed extends React.Component {

  ////////////////////
  // PROPS & STATES //
  ////////////////////

  static propTypes = {
    photoList   : PropTypes.array,
    isLoaded    : PropTypes.bool,
    fetchPhotos : PropTypes.func
  }



  ////////////////
  // RENDERINGS //
  ////////////////

  render() {

    const { photoList, isLoaded } = this.props

    if ( !isLoaded ) {
      return (
        <div className = 'photo-feed' >
          <LoadingSpinner />
        </div>
      )
    }

    return (
      <div className = 'photo-feed'>
        <Carousel items = { photoList } />
      </div>
    )
  }



  /////////////////////
  // LIFECYCLE HOOKS //
  /////////////////////

  componentDidMount() {
    this.props.fetchPhotos()
  }
}


const mapStateToProps = function( state ) {
  return getFeedPhotos( state )
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
)( PhotoFeed )

export default photoFeed
