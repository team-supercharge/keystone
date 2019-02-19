import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class LmcPasswordsScreen extends Component {
    render() {
        return (
            <div>
                Shift Passwords
            </div>
        )
    }
}

LmcPasswordsScreen.propTypes = {}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LmcPasswordsScreen)