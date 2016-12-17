import React from 'react'

import UserProfile from '../containers/userProfile'
import PhotoFeed from '../containers/photoFeed'

import '../scss/root.scss'

class Root extends React.Component {
  render() {
    return (
      <div className = 'root' >
        <UserProfile />
        <PhotoFeed />
      </div>
    )
  }
}

export default Root
