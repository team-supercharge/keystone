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
            <tr>
                <td style={styles.entry}>
                    <span style={styles.entry}>
                        { shift.title }
                    </span>
                </td>
                <td style={styles.entry}>
                    <span style={styles.entry}>
                        { shift.startTime }
                    </span>
                </td>
                <td style={styles.entry}>
                    <span style={styles.entry}>
                        { shift.endTime }
                    </span>
                </td>
                <td style={styles.entry}>
                    <span style={styles.entry}>
                        {`${shift.length} hours`}
                    </span>
                </td>
                <td style={styles.entryActions}>
                    <GlyphButton
                        component={Link}
                        glyph='pencil'
                        position='left'
                        style={styles.button}
                        to={`${Keystone.adminPath}/shifts/${shift.id}`}
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
                </td>
            </tr>
        ) 
    }
}

const styles = {
    entry: {
        height: 70,
    },

}

LmcShiftPasswordItem.propTypes = {
    shift: PropTypes.object,
    onDelete: PropTypes.func.isRequired
}