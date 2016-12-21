import React, { PropTypes } from 'react'

import './profileImage.scss'

class ProfileImage extends React.Component {

  ////////////////////
  // PROPS & STATES //
  ////////////////////



  static propTypes = {
    thumbnailLink: PropTypes.string
  }


  ////////////////
  // RENDERINGS //
  ////////////////



  render() {

    const { thumbnailLink } = this.props

    return (
      <div className = 'profile-image-outer'>
        <img className = 'profile-image-inner' src = {thumbnailLink} />
      </div>
    )
  }
}

export default ProfileImage
