import React from 'react'
import PropTypes from 'prop-types'
import { BlankState } from '../../../../elemental'

const NO_SHIFTS_MESSAGE = "You haven't added any shift passwords yet"
const SUPPORT_LINK = 'https://support.logmycare.co.uk/the-care-office/finishing-your-essential-setup/how-do-i-set-up-a-shift-password'

const renderTable = (shifts) => {
    return (
        <div>
            <h2 style={styles.title}>
                Shift Passwords
            </h2>
            <div className='lmc-theme-gradient' style={styles.divider} />
            <table cellPadding="0" cellSpacing="0" className="Table ItemList">
                <thead>
                    <tr>
                        <th>
                            Title
                        </th>
                        <th>
                            Start
                        </th>
                        <th>
                            End
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Shift 1
                        </td>
                        <td>
                            08:99
                        </td>
                        <td>
                            13:22
                        </td>
                    </tr>
                </tbody>
            </table>
            {/* <ul style={styles.list}>
            { JSON.stringify(shifts) }
            </ul> */}
        </div>
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

const LmcShiftPasswordsTable = ({ shifts }) => {
    const hasShifts = shifts && shifts.length
    
    return ( hasShifts ? renderTable(shifts) : renderEmptyPage() )
}

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
    shifts: PropTypes.array
}

export default LmcShiftPasswordsTable