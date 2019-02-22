import React from 'react'
import PropTypes from 'prop-types'
import { BlankState } from '../../../../elemental'
import LmcShiftPasswordItem from './LmcShiftPasswordItem.jsx'

const LmcShiftPasswordsTable = ({ shifts, onDelete }) => {
    const headings = ['Title', 'Start / End', 'Access Time', 'Actions']
    const hasShifts = shifts && shifts.length
    return ( 
        hasShifts ? (
            <div>
                <h2 style={styles.title}>
                    Shift Passwords
                </h2>
                <div className='lmc-theme-gradient' style={styles.divider} />
                <div style={styles.headingsContainer}>
                    { headings.map((heading, i) => {
                        return (
                            <div 
                                key={i}
                                style={styles.heading}
                            >
                                { heading }
                            </div>
                        )
                    })}
                </div>
                <div style={styles.subDivider} />
                <ul style={styles.list}>
                    { shifts.map(shift => {
                        return (
                            <div key={shift.id}>
                                <LmcShiftPasswordItem
                                    shift={shift}
                                    onDelete={onDelete}
                                />
                                <div style={styles.subDivider} />
                            </div>
                        )
                    })}
                </ul>  
                
            </div>
        ) : renderEmptyPage()
    )
}

const renderEmptyPage = () => {
    return (
        <div>
            <BlankState
                heading={NO_SHIFTS_MESSAGE}
                style={styles.noShiftsMessage}
            >
                For extra security, we highly recommend using shift passwords.
                <a 
                    href={SUPPORT_LINK}
                    style={styles.supportLink}
                    target='_blank'
                >
                    Find out more
                </a> 
            </BlankState>
        </div>
    )
}

const NO_SHIFTS_MESSAGE = "You haven't added any shift passwords yet"
const SUPPORT_LINK = 'https://support.logmycare.co.uk/the-care-office/finishing-your-essential-setup/how-do-i-set-up-a-shift-password'

const styles = {
    title: {
        marginBottom: '0.3em',
        fontWeight: 300,
    },
    divider: {
        height: 2,
        marginBottom: 22,
        width: '100%',
    },
    heading: {
        width: '25%',
        minWidth: 70,
        fontWeight: 300,
        fontSize: 20,
        color: '#999999'
    },
    headingsContainer: {
        width: '100%',
        minWidth: 290,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    list: {
        listStyle: 'none',
        listStyleType: 'none',
        padding: 0,
    },
    noShiftsMessage: {
        position: 'relative',
        top: 50,
    },
    subDivider: {
        backgroundColor: '#f2f2f2',
        height: 2,
        marginTop: 8,
    },
    supportLink: {
        paddingLeft: 5,
    },
}

LmcShiftPasswordsTable.propTypes = {
    shifts: PropTypes.array,
    onDelete: PropTypes.func.isRequired
}

export default LmcShiftPasswordsTable