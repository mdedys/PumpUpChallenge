import React, { PropTypes } from 'react'

import Image         from '../image'
import Info          from './info'

import '../../scss/userProfile/profile.scss'

class Profile extends React.Component {

  componentDidMount() {
    this.props.fetchProfile()
  }

  render() {
    const { user } = this.props

    return (
      <div className = 'profile'>

        <div className = 'profile-image-container'>
          <div className = 'profile-image-circle'>
            <Image src = { user.image.thumbnail.link } />
          </div>
        </div>

        <div className = 'profile-info-container'>
          <Info
            name = { user.name }
            bio = { user.bio } />
        </div>

      </div>
    )
  }
}

Profile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    bio: PropTypes.shape({
      description: PropTypes.string,
      isExpanded: PropTypes.bool
    }),
    image: PropTypes.shape({
      thumbnail: PropTypes.shape({
        link: PropTypes.string,
        isFetching: PropTypes.bool
      }),
      highResolution: PropTypes.shape({
        link: PropTypes.string,
        data: PropTypes.object,
        isFetching: PropTypes.bool
      })
    })
  })
}

export default Profile
