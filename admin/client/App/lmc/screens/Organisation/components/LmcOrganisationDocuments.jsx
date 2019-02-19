import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class LmcOrganisationDocuments extends Component {
    render() {
        return (
            <div>
                Documents
            </div>
        )
    }
}

LmcOrganisationDocuments.propTypes = {}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LmcOrganisationDocuments)