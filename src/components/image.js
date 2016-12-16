import React, { PropTypes } from 'react'

import LoadingSpinner from './loadingSpinner'

class Image extends React.Component {
  render() {

    const { src } = this.props

    if ( !src ) {
      return <LoadingSpinner />
    }

    return (
       <img src = { this.props.src } />
    )
  }
}

Image.propTypes = {
  src: PropTypes.string
}

export default Image
