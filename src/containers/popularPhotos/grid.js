import { connect }          from 'react-redux'
import React, { PropTypes } from 'react'

import PhotoActions         from '../../actions/photos'
import GridPhoto            from '../../components/popularPhotos/gridPhoto'
import LoadingSpinner       from '../../components/loadingSpinner'

import './grid.scss'

class Grid extends React.Component {

  componentDidMount() {
    this.props.fetchPhotos()
  }

  render() {

    const { photoList } = this.props

    if ( !photoList || photoList.length === 0 ) {
      return (
        <div className = 'grid'>
          <LoadingSpinner />
        </div>
      )
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

Grid.propTypes = {
  photoList: PropTypes.array,
  fetchPhotos: PropTypes.func
}

Grid.defaultProps = {
  photoList: null
}

const mapStateToProps = function( state ) {
  return {
    photoList: state.popularPhotos.photoList
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
