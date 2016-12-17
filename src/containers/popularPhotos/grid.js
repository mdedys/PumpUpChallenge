import { connect }          from 'react-redux'
import React, { PropTypes } from 'react'

import PhotoActions         from '../../actions/photos'
import GridPhoto            from '../../components/popularPhotos/gridPhoto'

import './grid.scss'

class Grid extends React.Component {

  componentDidMount() {
    this.props.fetchPhotos()
  }

  render() {

    const { photoList } = this.props

    const photos = photoList.map( photo => {
      return <GridPhoto key = { photo.id } link = { photo.link } />
    })

    return (
      <div className = 'photo-grid'>
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
  photoList: []
}

const mapStateToProps = ( state ) => {
  return {
    photoList: state.popularPhotos.photoList
  }
}

const mapDispatchToProps = ( dispatch ) => {
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
