import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class LmcHandoversHistory extends Component {
    render () {
        const { handovers } = this.props
        return (
            <div>
                { JSON.stringify(handovers) }
            </div>
        )
    }
}

LmcHandoversHistory.propTypes = {
    handovers: PropTypes.array.isRequired
}