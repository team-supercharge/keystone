import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class LmcOrganisationScreen extends Component {
    render() {
        return (
            <div>
               Organisation 
            </div>
        )
    }
}

LmcOrganisationScreen.propTypes = {}

const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = () => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LmcOrganisationScreen)