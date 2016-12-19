import React, { PropTypes } from 'react'

import './userName.scss'

class UserName extends React.Component {

  ////////////////////
  // PROPS & STATES //
  ////////////////////

  static propTypes = {
    children: PropTypes.string
  }



  ////////////////
  // RENDERINGS //
  ////////////////

  render() {
    return (
      <div className = 'user-name'>
        {this.props.children}
      </div>
    )
  }
}

export default UserName
