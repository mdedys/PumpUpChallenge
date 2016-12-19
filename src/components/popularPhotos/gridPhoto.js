import React, { PropTypes } from 'react'

import './gridPhoto.scss'

class Photo extends React.Component {

  static propTypes = {
    link: PropTypes.string
  }

  render() {

    const { link } = this.props

    return(
      <div className = 'grid-photo'>
        <img src = { link } />
      </div>
    )
  }
}

export default Photo
