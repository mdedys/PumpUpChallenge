import React, { PropTypes } from 'react'
import { connect }          from 'react-redux'

import UserActions          from '../../actions/user'
import TextParser           from '../../utils/textParser'
import { getParsedBio }     from '../../selectors/user'

import './profile.scss'

class Profile extends React.Component {

  componentDidMount() {
    this.props.fetchProfile()
  }

  render() {

    const { name, bio, imageLink } = this.props

    //TODO: Rework to not rely on dangerouslySetInnerHTML
    let parsedBio
    if ( bio.description ) {
      parsedBio = TextParser.replaceHashTags( bio.description )
      parsedBio = TextParser.replaceMentions( parsedBio )
    }

    return (
      <div className = 'profile'>

        <div className = 'profile-image-container'>
          <div className = 'profile-image-circle'>
            <img className = 'profile-image' src = { imageLink } />
          </div>
        </div>

        <div className = 'profile-info-container'>
          <div className = 'profile-info-name' >
            { name }
          </div>
          <div
            className = 'profile-info-bio'
            dangerouslySetInnerHTML = { { __html: parsedBio } } />
        </div>

      </div>
    )
  }
}

Profile.propTypes = {
  name: PropTypes.string,
  bio: PropTypes.shape({
    description: PropTypes.string,
    isExpanded: PropTypes.bool
  }),
  imageLink: PropTypes.string,
  fetchProfile: PropTypes.func
}


const mapStateToProps = function( state ) {
  return {
    name: state.user.name,
    bio: {
      description: getParsedBio( state ),
      isExpanded: state.user.bio.isExpanded
    },
    imageLink: state.user.image.link
  }
}

const mapDispatchToProps = function( dispatch ) {
  return {
    fetchProfile: () => {
      dispatch( UserActions.fetchProfile() )
    }
  }
}

const profile = connect(
  mapStateToProps,
  mapDispatchToProps
)( Profile )

export default profile
