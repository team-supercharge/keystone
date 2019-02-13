import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Selectors from '../../../selectors'

export class LmcResidentProfile extends Component {
    render() {
        const { selectedResident } = this.props
        return (
            <div>
                {JSON.stringify(this.props.profile)}
                <Link
                    to={`${Keystone.adminPath}/residents/${selectedResident}`}
                >
                    Edit Information
                </Link>
            </div>
        )
    }
}

LmcResidentProfile.propTypes = {
    selectedResident: PropTypes.string.isRequired,
    profile: PropTypes.object,
}

const mapStateToProps = (state) => {
    return {
        selectedResident: state.residents.selectedResident,
        profile: Selectors.getSelectedResidentProfile(state),
    }
}

export default connect(mapStateToProps)(LmcResidentProfile)