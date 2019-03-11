import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class LmcCurrentHandover extends Component {
    render () {
        const { logsByResident, notes } = this.props
        return (
            <div>
                <div>
                    <h2 style={styles.heading}>
                        Current Handover
                    </h2>
                    <div className='lmc-theme-gradient' style={styles.divider} />
                    <div>
                        <p>{JSON.stringify(logsByResident)}</p>
                        <p>{JSON.stringify(notes)}</p>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    divider: {
        height: 2,
        marginBottom: 22,
        width: '100%',
    },
    heading: {
        marginBottom: '0.3em',
        fontWeight: 300,
        textOverflow: 'ellipsis',
        hyphens: 'auto',
    },
}

LmcCurrentHandover.propTypes = {
    logsByResident: PropTypes.array.isRequired,
    notes: PropTypes.array.isRequired
}