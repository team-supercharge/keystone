import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class LmcCurrentHandover extends Component {
    render () {
        const { logs, notes } = this.props

        return (
            <div>
                <p>{JSON.stringify(logs)}</p>
                <p>{JSON.stringify(notes)}</p>
            </div>
        )
    }
}

LmcCurrentHandover.propTypes = {
    logs: PropTypes.array.isRequired,
    notes: PropTypes.array.isRequired
}