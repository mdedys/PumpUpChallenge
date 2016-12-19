import React, { PropTypes } from 'react'

import './userName.scss'

class UserName extends React.Component {
  static propTypes = {
    children: PropTypes.string
  }

  render() {
    return (
      <div className = 'user-name'>
        {this.props.children}
      </div>
    )
  }
}

export default UserName
