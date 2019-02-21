import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActionCreators } from '../../../actions/actions'
import { connect } from 'react-redux'
import LmcSpinner from '../../../components/LmcSpinner.jsx'
import LmcShiftPasswordsTable from './LmcShiftPasswordsTable.jsx'
import LmcCreateButton from '../../../components/LmcCreateButton.jsx'

export class LmcShiftPasswordsScreen extends Component {
    render() {
        const { shifts, fetchShifts } = this.props

        return (
            <div style={styles.mainContainer}>
                <div style={styles.content}>
                    <LmcCreateButton
                        buttonText='Shift Password'
                        listId='Shift'
                        title='Add a Shift Password'
                        onCreate={fetchShifts}
                        style={styles.addButton}
                    />
                    { shifts ? (
                        <LmcShiftPasswordsTable
                            shifts={shifts}
                        />
                    ) : (
                        <LmcSpinner />
                    )}
                </div>
            </div>
        )
    }
}

const styles = {
    addButton: {
        width: 200,
        float: 'right',
    },
    mainContainer: {
        padding: '50px 20px 0px 20px',
        overflow: 'scroll',
        height: '83vh',
    },
    content: {
        maxWidth: 1000,
        margin: '0 auto',
        wordWrap: 'break-word',
    }
}

LmcShiftPasswordsScreen.propTypes = {
    shifts: PropTypes.array,
    fetchShifts: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    return {
        shifts: state.data.shifts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchShifts: () => dispatch(ActionCreators.loadList('shifts'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LmcShiftPasswordsScreen)