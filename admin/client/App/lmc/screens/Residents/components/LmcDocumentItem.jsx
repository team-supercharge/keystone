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
            <li>
                <div style={styles.container}>
                    <span style={styles.documentName}>
                        {data.name}
                    </span>
                    <Button color='default'>
                        <a
                            href={data.pdf}
                            style={styles.linkButtonText}
                            target='_blank'
                        >
                            View
                        </a>
                    </Button>
                    <Button 
                        onClick={this.toggleDeleteDialog} 
                        variant="link" 
                        color="delete"
                        style={styles.deleteButton} 
                        data-button="delete"
                    >
                        Delete
					</Button>
                </div>
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
        display: 'inline-block',
    },
    deleteButton: {
        float: 'right',
    },
    documentName: {

    },
    linkButtonText: {
        color: 'black',
        textDecoration: 'none',
    }
}

LmcDocumentItem.propTypes = {
    data: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
}