import React, { PropTypes } from 'react'

import './gridPhoto.scss'

class Photo extends React.Component {

  ////////////////////
  // PROPS & STATES //
  ////////////////////



  static propTypes = {
    link : PropTypes.string
  }



  ////////////////
  // RENDERINGS //
  ////////////////



  render() {

    const { link } = this.props

    return(
      <div className = 'grid-photo'>
        <img src = {link} />
      </div>
    )
  }
}

export default Photo
