import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LmcHandoverResidentItem from './LmcHandoverResidentItem.jsx'

export default class LmcCurrentHandover extends Component {
    render () {
        const { logsByResident, notes } = this.props
        return (
            <div>
                <h2 style={styles.heading}>
                    Current Handover
                </h2>
                <div className='lmc-theme-gradient' style={styles.divider} />
                <div style={styles.dataContainer}>
                    <div style={styles.leftContainer}>
                        { logsByResident.map((logGroup, i) => {
                            return (
                                <div key={i}>
                                    <LmcHandoverResidentItem
                                        data={logGroup}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div style={styles.rightContainer}>
                        <p>{JSON.stringify(notes)}</p>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    dataContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    divider: {
        height: 2,
        marginBottom: 22,
        width: '100%',
    },
    leftContainer: {
        width: '60%',
        paddingRight: 20
    },
    rightContainer: {
        width: '40%',
        flex: '1'
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