import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../../../../elemental'
import ConfirmationDialog from '../../../../shared/ConfirmationDialog'

export default class LmcDocumentItem extends Component {
    state = {
        deleteDialogOpen: false
    }
    
    toggleDeleteDialog = () => {
        this.setState(prevState => ({
            deleteDialogOpen: !prevState.deleteDialogOpen
        }))
    }

    render () {
        const { data, onDelete } = this.props
        return (
            <li style={styles.container}>
                <span style={styles.documentName}>
                    {data.name}
                </span>
                <Button 
                    onClick={this.toggleDeleteDialog} 
                    variant="link" 
                    color="delete"
                    style={styles.deleteButton} 
                    data-button="delete"
                >
                    Delete
                </Button>
                <Button style={styles.viewButton} color='default'>
                    <a
                        href={data.pdf}
                        style={styles.linkButtonText}
                        target='_blank'
                    >
                        View
                    </a>
                </Button>
                <ConfirmationDialog
                    confirmationLabel='Delete'
                    confirmationType='danger'
                    isOpen={this.state.deleteDialogOpen}
                    onCancel={this.toggleDeleteDialog}
                    onConfirmation={() => onDelete(data.id)}
                >
                    <div>
                        Are you sure you want to delete this document? If you go ahead, it can’t be undone. Once it's gone, it’s gone for good!
                    </div>
                </ConfirmationDialog>
            </li>
        )
    }
}

const styles = {
    container: {
        height: 60,
    },
    deleteButton: {
        float: 'right',
    },
    documentName: {
        fontSize: 18,
        paddingTop: 3,
    },
    linkButtonText: {
        color: 'black',
        textDecoration: 'none',
    },
    viewButton: {
        float: 'right',
    }
}

LmcDocumentItem.propTypes = {
    data: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
}