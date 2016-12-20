import React            from 'react'

import PhotoFeed        from '../containers/photoFeed/feed'
import PopularPhotos    from '../containers/popularPhotos/grid'
import UserProfile      from '../containers/userProfile/profile'


import './root.scss'

class Root extends React.Component {

  ////////////////
  // RENDERINGS //
  ////////////////



  render() {
    return (
      <div className = 'root' >
        <UserProfile />
        <PhotoFeed />
        <PopularPhotos />
      </div>
    )
  }
}

export default Root
