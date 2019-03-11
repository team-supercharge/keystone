import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AnimateHeight from 'react-animate-height'
import LmcHandoverResidentItem from './LmcHandoverResidentItem.jsx'
import LmcHandoverNotes from './LmcHandoverNotes.jsx'

export default class LmcHandoverHistoryItem extends Component {
    render () {
        const { logsByResident, notes, seenBy } = this.props.handover
        return (
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
                    <LmcHandoverNotes
                        notes={notes}
                    />
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
    leftContainer: {
        width: '60%',
        paddingRight: 20
    },
    rightContainer: {
        width: '40%',
        flex: '1'
    },
}

LmcHandoverHistoryItem.propTypes = {
    handover: PropTypes.object.isRequired
}