import React, { Component } from 'react'
import { connect } from 'react-redux'

export class LmcResidentProfile extends Component {
    render() {
        return (
            <div>Profile</div>
        )
    }
}

const mapStateToProps = (state) => {

}

export default connect(mapStateToProps)(LmcResidentProfile)