import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LmcHandoverHistoryItem from './LmcHandoverHistoryItem.jsx'

export default class LmcHandoversHistory extends Component {
    render () {
        const { handovers } = this.props
        return (
            <div>
                { Object.keys(handovers).map((date, i) => {
                    const currentHandoversList = handovers[date]

                    return (
                        <div key={i}>
                            <h2 style={styles.heading}>
                                {date}
                            </h2>
                            <div 
                                className='lmc-theme-gradient' 
                                style={styles.divider} 
                            />
                            { currentHandoversList.map((handover, i) => {
                                return (
                                    <LmcHandoverHistoryItem
                                        handover={handover}
                                        key={i}
                                    />
                                )
                            })}
                        </div>
                    )
                })}
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

LmcHandoversHistory.propTypes = {
    handovers: PropTypes.array.isRequired
}