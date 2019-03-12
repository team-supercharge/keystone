import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LmcTabBar from '../../components/LmcTabBar.jsx'


export class LmcOrganisationScreen extends Component {
    render() {
        const { children, location } = this.props

        return (
            <div style={styles.container}>
                <div style={styles.navbar}>
                    <LmcTabBar
                        items={tabs}
                        resourceUrl={'organisation'}
                        location={location}
                    />
                </div>
                <div>
                    { children }
                </div>
            </div>
        )
    }
}

const tabs = [
    { url: 'team', label: 'Team Members', octicon: 'organization' },
    { url: 'shift-passwords', label: 'Shift Passwords', octicon: 'key' },
    { url: 'documents', label: 'Documents', octicon: 'file' }
]

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        wordWrap: 'break-word',
    },
    navbar: {
        zIndex: 2
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