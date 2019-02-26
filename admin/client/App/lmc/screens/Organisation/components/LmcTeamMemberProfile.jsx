import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Selectors from '../../../selectors/index'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button } from '../../../../elemental'

export class LmcTeamMemberProfile extends Component {
    render () {
        const { profile, selectedUser } = this.props
        return (
            <div>
                { JSON.stringify(profile) }
                <Button color='default'>
                    <Link
                        to={`${Keystone.adminPath}/users/${selectedUser}`}
                        style={styles.linkButtonText}
                    >
                        Edit Information
                    </Link>
                </Button>
            </div>
        )
    }
}

const styles = {
    linkButtonText: {
        color: 'black',
        display: 'block',
        height: '100%',
        textDecoration: 'none'
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