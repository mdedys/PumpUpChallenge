import { connect }          from 'react-redux'
import React, { PropTypes } from 'react'

import PhotoActions         from '../../actions/photos'
import GridPhoto            from '../../components/popularPhotos/gridPhoto'

import './grid.scss'

class Grid extends React.Component {

  static propTypes = {
    photoList   : PropTypes.array,
    isLoaded    : PropTypes.bool,
    fetchPhotos : PropTypes.func
  }

  componentDidMount() {
    this.props.fetchPhotos()
  }

  render() {

    const { photoList, isLoaded } = this.props

    if ( !isLoaded ) {
      return null
    }

    const photos = photoList.map( photo => {
      return <GridPhoto key = { photo.id } link = { photo.link } />
    })

    return (
      <div className = 'grid'>
        { photos }
      </div>
    )
  }
}

const mapStateToProps = function( state ) {
  return {
    photoList: state.popularPhotos.photoList,
    isLoaded: state.popularPhotos.isLoaded
  }
}

const mapDispatchToProps = function( dispatch ) {
  return {
    fetchPhotos: () => {
      dispatch( PhotoActions.fetchPopularPhotos() )
    }
  }
}

const grid = connect(
  mapStateToProps,
  mapDispatchToProps
)( Grid )

export default grid
