import React from 'react'
import PropTypes from 'prop-types'
import { BlankState } from '../../../../elemental'
import LmcShiftPasswordItem from './LmcShiftPasswordItem.jsx'

const LmcShiftPasswordsTable = ({ shifts, onDelete }) => {
    const headings = ['Title', 'Start', 'End', 'Access Time', 'Actions']
    const hasShifts = shifts && shifts.length
    return ( 
        hasShifts ? (
            <div>
                <h2 style={styles.title}>
                    Shift Passwords
                </h2>
                <div className='lmc-theme-gradient' style={styles.divider} />
                <table 
                    cellPadding="0" 
                    cellSpacing="0" 
                    className="Table ItemList"
                >
                    <thead>
                        <tr>
                            { headings.map(heading => {
                                return (
                                    <th 
                                        key={heading}
                                        style={styles.heading}
                                    >
                                        { heading }
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        { shifts.map(shift => {
                            return (
                                <LmcShiftPasswordItem
                                    key={shift.id}
                                    shift={shift}
                                    onDelete={onDelete}
                                />
                            )
                        })}
                    </tbody>
                </table>
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
        fontWeight: 300,
        fontSize: 20,
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
    supportLink: {
        paddingLeft: 5,
    },
}

LmcShiftPasswordsTable.propTypes = {
    shifts: PropTypes.array,
    onDelete: PropTypes.func.isRequired
}

export default LmcShiftPasswordsTable