import React, { Component } from 'react'
import { connect } from 'react-redux'
import Selectors from '../../../selectors'

export class LmcResidentProfile extends Component {
    render() {
        return (
            <div>{JSON.stringify(this.props.profile)}</div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: Selectors.getSelectedResidentProfile(state)
    }
}

export default connect(mapStateToProps)(LmcResidentProfile)