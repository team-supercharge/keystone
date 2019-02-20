import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Selectors from '../../../selectors/index'
import { connect } from 'react-redux';

export class LmcTeamMemberProfile extends Component {
    render () {
        const { profile } = this.props
        return (
            <div>
                { JSON.stringify(profile) }
            </div>
        )
    }
}

LmcTeamMemberProfile.propTypes = {
    selectedUser: PropTypes.string.isRequired,
    selectedUserProfile: PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        profile: Selectors.getSelectedUserProfile(state)
    }
}

export default connect(mapStateToProps)(LmcTeamMemberProfile)