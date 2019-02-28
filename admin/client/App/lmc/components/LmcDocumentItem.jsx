import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { isBrowser, isTablet } from 'react-device-detect'
import { Link } from 'react-router'
import { Button, GlyphButton } from '../../elemental'
import ConfirmationDialog from '../../shared/ConfirmationDialog'

export default class LmcDocumentItem extends Component {
    state = {
        deleteDialogOpen: false
    }
    
    toggleDeleteDialog = () => {
        this.setState(prevState => ({
            deleteDialogOpen: !prevState.deleteDialogOpen
        }))
    }

    handleDeleteConfirm = (id) => {
        this.toggleDeleteDialog()
        this.props.onDelete(id)
    }

    render () {
        const { data, listId } = this.props
        const daysDiff = moment().diff(data.createdAt, 'days')
        const displayedTime = daysDiff <= 7 
            ? moment(data.createdAt).calendar() 
            : `Added ${daysDiff} days ago`
        const editLink = `${Keystone.adminPath}/${listId}/${data.id}`
        const chosenStyles = (isBrowser || isTablet) ? desktopStyles : mobileStyles
        return (
            <li style={chosenStyles.container}>
                <div style={chosenStyles.infoContainer}>
                    <div style={desktopStyles.imageContainer}>
                        <img 
                            src={IMAGE_URL} 
                            style={desktopStyles.image} 
                        />
                    </div>
                    <div style={desktopStyles.textContainer}>
                        <a 
                            href={data.pdf}
                            style={desktopStyles.documentName}
                            target='_blank'
                        >
                            {data.name}
                        </a>
                        <br />
                        <span style={desktopStyles.dateDiff}>
                            {displayedTime}
                        </span>
                    </div>
                </div>
                <div style={chosenStyles.buttonContainer}>
                    <Button
                        style={chosenStyles.button} 
                        color='default'
                        href={data.pdf}
                        target='_blank'
                    >
                        View
                    </Button>
                    <GlyphButton
                        component={Link}
                        glyph='pencil'
                        position='left'
                        style={chosenStyles.button}
                        to={editLink}
                    >
                        Edit
                    </GlyphButton>
                    <Button 
                        onClick={this.toggleDeleteDialog} 
                        variant="link" 
                        color="delete"
                        style={chosenStyles.button} 
                        data-button="delete"
                    >
                        Delete
                    </Button>
                </div>
                <ConfirmationDialog
                    confirmationLabel='Delete'
                    confirmationType='warning'
                    isOpen={this.state.deleteDialogOpen}
                    onCancel={this.toggleDeleteDialog}
                    onConfirmation={() => this.handleDeleteConfirm(data.id)}
                >
                    <div>
                        Are you sure you want to delete this document? 
                        If you go ahead, it can’t be undone. 
                        Once it's gone, it’s gone for good!
                    </div>
                </ConfirmationDialog>
            </li>
        )
    }
}

const IMAGE_URL = 'https://s3.eu-west-2.amazonaws.com/lmc-data-production/public/assessment.png'

const desktopStyles = {
    button: {
        position: 'relative',
        top: 5,
        marginLeft: 10,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    dateDiff: {
        fontSize: 12,
        opacity: '0.6',
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
    },
    textContainer: {
        display: 'inline-block',
        paddingLeft: 20,
    },
}

const mobileStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    button: {
        float: 'left',
        position: 'relative',
        top: 5,
        marginRight: 10,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 8,
        marginBottom: 8,
        marginLeft: 59,
    },
}

LmcDocumentItem.propTypes = {
    data: PropTypes.object.isRequired,
    listId: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
}