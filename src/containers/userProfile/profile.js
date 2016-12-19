import React, { PropTypes } from 'react'
import { connect }          from 'react-redux'
import ClassNames           from 'classnames'

import UserActions          from '../../actions/user'
import { summarizeBio }     from '../../selectors/user'
import UserName             from '../../components/userProfile/userName'
import BioSummary           from '../../components/userProfile/bioSummary'
import ProfileImage         from '../../components/userProfile/profileImage'
import LoadingSpinner       from '../../components/loadingSpinner'

import './profile.scss'

class Profile extends React.Component {

  static propTypes = {
    name          : PropTypes.string,
    bio           : PropTypes.string,
    summarizedBio : PropTypes.array,
    thumbnailLink : PropTypes.string,
    isLoaded      : PropTypes.bool,
    fetchProfile  : PropTypes.func
  }

  constructor() {
    super()

    this.state = { isExpanded: false }

    this.readMore = this.readMore.bind( this )
  }

  shouldComponentUpdate(nextProps, nextState) {
    let didNameChange = nextProps.name !== this.props.name
    let didBioChange = nextProps.bio !== this.props.bio
    let didImageChange = nextProps.thumbnailLink !== this.props.thumbnailLink

    let didBioExpand = nextState.isExpanded !== this.state.isExpanded

    return didNameChange || didBioChange || didImageChange || didBioExpand
  }

  componentDidMount() {
    this.props.fetchProfile()
  }

  readMore() {
    this.setState({ isExpanded: true })
  }

  render() {

    const { name, summarizedBio, thumbnailLink, isLoaded } = this.props

    console.log( this.props )

    if ( !isLoaded ) {
      return (
        <div className = 'profile' >
          <LoadingSpinner />
        </div>
      )
    }

    let profileClassName = ClassNames( 'profile', {
      'expanded': this.state.isExpanded
    })

    return (
      <div className = { profileClassName } >

        <div className = 'profile-image-container'>
          <ProfileImage thumbnailLink = { thumbnailLink } />
        </div>

        <div className = 'profile-info-container'>
            <UserName>
              {name}
            </UserName>
            <BioSummary
              isExpanded={this.state.isExpanded}
              onReadMore={this.readMore} >
                {summarizedBio}
            </BioSummary>
        </div>

      </div>
    )
  }
}

const mapStateToProps = function( state ) {
  return {
    name             : state.user.profile.name,
    bio              : state.user.profile.bio,
    summarizedBio    : summarizeBio( state ),
    thumbnailLink    : state.user.profile.image.thumbnail,
    isLoaded         : state.user.profile.isLoaded
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
