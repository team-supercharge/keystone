import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActionCreators } from '../../../actions/actions'
import { connect } from 'react-redux'
import LmcSpinner from '../../../components/LmcSpinner.jsx'
import LmcShiftPasswordsList from './LmcShiftPasswordsList.jsx'
import LmcCreateButton from '../../../components/LmcCreateButton.jsx'

export class LmcShiftPasswordsScreen extends Component {
    state = { 
        deleteDialogOpen: false
    }

    render() {
        const { shifts, deleteShift, fetchShifts } = this.props

        return (
            <div style={styles.mainContainer}>
                <div style={styles.content}>
                    <LmcCreateButton
                        buttonText='Shift'
                        listId='Shift'
                        title='Add a Shift'
                        onCreate={fetchShifts}
                        style={styles.addButton}
                    />
                    { shifts ? (
                        <LmcShiftPasswordsList
                            shifts={shifts}
                            onDelete={deleteShift}
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
        width: '15vw',
        float: 'right',
    },
    mainContainer: {
        padding: '50px 20px 0px 20px',
        overflow: 'auto',
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
        deleteShift: (id) => dispatch(ActionCreators.deleteShift(id)),
        fetchShifts: () => dispatch(ActionCreators.loadList('shifts'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LmcShiftPasswordsScreen)