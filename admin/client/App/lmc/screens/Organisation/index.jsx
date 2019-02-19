import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LmcSecondaryNavbar from '../../components/LmcSecondaryNavbar.jsx'


export class LmcOrganisationScreen extends Component {
    render() {
        const { children, location } = this.props

        return (
            <div>
                <LmcSecondaryNavbar
                    tabs={tabs}
                    location={location}
                />
                { children }
            </div>
        )
    }
}

const tabs = [
    { path: 'organisation/team', label: 'Team' },
    { path: 'organisation/passwords', label: 'Shift Passwords' },
    { path: 'organisation/documents', label: 'Documents' }
]

const styles = {

}

LmcOrganisationScreen.propTypes = {}

const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = () => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LmcOrganisationScreen)