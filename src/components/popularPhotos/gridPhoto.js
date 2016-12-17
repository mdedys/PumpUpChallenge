import React, { PropTypes } from 'react'

import Image from '../image'

import './gridPhoto.scss'

class Photo extends React.Component {
  render() {

    const { link } = this.props

    return(
      <div className = 'photo'>
        <Image src = { link } />
      </div>
    )
  }
}

Photo.propTypes = {
  link: PropTypes.string
}

export default Photo