import { connect }    from 'react-redux'
import UserActions    from '../actions/user'
import Profile        from '../components/userProfile/profile'

const mapStateToProps = ( state ) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    fetchProfile: () => {
      dispatch( UserActions.fetchProfile() )
    }
  }
}

const UserProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)( Profile )

export default UserProfile
