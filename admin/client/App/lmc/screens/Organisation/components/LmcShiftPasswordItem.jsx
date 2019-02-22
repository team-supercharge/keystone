import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, GlyphButton } from '../../../../elemental'
import { Link } from 'react-router'
import ConfirmationDialog from '../../../../shared/ConfirmationDialog'

export default class LmcShiftPasswordItem extends Component {
    state = {
        deleteDialogOpen: false
    }

    toggleDeleteDialog = () => {
        this.setState(prevProps => ({
            deleteDialogOpen: !prevProps.deleteDialogOpen
        }))
    }

    handleDeleteConfirm = (id) => {
        this.toggleDeleteDialog()
        this.props.onDelete(id)
    }

    render () {
        const { shift } = this.props
        return (
            <li style={styles.container}>
                <div style={styles.entry}>
                    <span>
                        { shift.title }
                    </span>
                </div>
                <div style={styles.entry}>
                    <span>
                        { shift.startTime } - { shift.endTime }
                    </span>
                </div>
                <div style={styles.entry}>
                    <span>
                        { shift.length } hours
                    </span>
                </div>
                <div style={styles.entryActions}>
                    <GlyphButton
                        component={Link}
                        glyph='pencil'
                        position='left'
                        to={`${Keystone.adminPath}/shifts/${shift.id}`}
                        style={styles.button}
                    >
                        Edit
                    </GlyphButton>
                    <Button 
                        onClick={this.toggleDeleteDialog} 
                        variant="link" 
                        color="delete"
                        style={styles.button}
                        data-button="delete"
                    >
                        Delete
                    </Button>
                    <ConfirmationDialog
                        confirmationLabel='Delete'
                        confirmationType='warning'
                        isOpen={this.state.deleteDialogOpen}
                        onCancel={this.toggleDeleteDialog}
                        onConfirmation={() => this.handleDeleteConfirm(shift.id)}
                    >
                        <div>
                            Are you sure you want to delete this shift? 
                            If you go ahead, it can’t be undone.
                        </div>
                    </ConfirmationDialog>
                </div>
            </li>
        ) 
    }
}

const styles = {
    container: {
        width: '100%',
        minWidth: 290,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    button: {
        width: 76,
    },
    entry: {
        width: '25%',
        minWidth: 70,
    },
    entryActions: {
        width: '25%',
        minWidth: 70,
        position: 'relative',
        bottom: 5,
    }
}

LmcShiftPasswordItem.propTypes = {
    shift: PropTypes.object,
    onDelete: PropTypes.func.isRequired
}