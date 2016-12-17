import React            from 'react'

import UserProfile      from '../containers/userProfile/profile'
import PhotoFeed        from '../containers/photoFeed/feed'
import PopularPhotoGrid from '../containers/popularPhotos/grid'

import './root.scss'

class Root extends React.Component {
  render() {
    return (
      <div className = 'root' >
        <UserProfile />
        <PhotoFeed />
        <PopularPhotoGrid />
      </div>
    )
  }
}

export default Root
