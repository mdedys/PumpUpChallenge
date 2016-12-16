import React from 'react'

import UserProfile from '../containers/userProfile'

import '../scss/root.scss'

class Root extends React.Component {
  render() {
    return (
      <div className = 'root' >
        <UserProfile />
      </div>
    )
  }
}

export default Root
