import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class LmcTeamScreen extends Component {
    render() {
        return (
            <div>
                Team
            </div>
        )
    }
}

LmcTeamScreen.propTypes = {}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LmcTeamScreen)