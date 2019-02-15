import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
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
        const currentDate = moment()
        const diff = currentDate.diff(data.createdAt, 'days')

        return (
            <li style={styles.container}>
                <div style={styles.imageContainer}>
                    <img 
                        src={IMAGE_URL} 
                        style={styles.image} 
                    />
                </div>
                <div style={styles.textContainer}>
                    <a 
                        href={data.pdf}
                        style={styles.documentName}
                        target='_blank'
                    >
                        {data.name}
                    </a>
                    <br />
                    <span style={styles.dateDiff}>
                        Added {diff} days ago
                    </span>
                </div>
                <Button 
                    onClick={this.toggleDeleteDialog} 
                    variant="link" 
                    color="delete"
                    style={styles.deleteButton} 
                    data-button="delete"
                >
                    Delete
                </Button>
                <Button
                    style={styles.viewButton} 
                    color='default'
                    href={data.pdf}
                    target='_blank'
                >
                    View
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

const IMAGE_URL = 'https://s3.eu-west-2.amazonaws.com/lmc-data-production/public/assessment.png'

const styles = {
    container: {
        height: 70,
    },
    dateDiff: {
        fontSize: 12,
        opacity: '0.6',
    },
    deleteButton: {
        float: 'right'
    },
    documentName: {
        color: 'black',
        fontSize: 15,
        textDecoration: 'none',
    },
    image: {
        width: 20,
        height: 20,
        margin: '9px 0px 0px 0px'
    },
    imageContainer: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        textAlign: 'center',
        backgroundColor: '#8AABC8',
        float: 'left',
        position: 'relative',
        bottom: 2,
    },
    textContainer: {
        display: 'inline-block',
        paddingLeft: 20,
    },
    viewButton: {
        float: 'right',
        padding: '0px !important',
    }
}

LmcDocumentItem.propTypes = {
    data: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
}