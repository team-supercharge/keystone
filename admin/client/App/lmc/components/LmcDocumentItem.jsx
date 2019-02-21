import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
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
                        {displayedTime}
                    </span>
                </div>
                <Button 
                    onClick={this.toggleDeleteDialog} 
                    variant="link" 
                    color="delete"
                    style={styles.button} 
                    data-button="delete"
                >
                    Delete
                </Button>
                <GlyphButton
                    component={Link}
                    glyph='pencil'
                    position='left'
					style={styles.button}
					to={editLink}
				>
                    Edit
                </GlyphButton>
                <Button
                    style={styles.button} 
                    color='default'
                    href={data.pdf}
                    target='_blank'
                >
                    View
                </Button>
                <div style={styles.divider} />
                <ConfirmationDialog
                    confirmationLabel='Delete'
                    confirmationType='danger'
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

const styles = {
    button: {
        float: 'right',
        position: 'relative',
        top: 5,
        marginLeft: 10,
    },
    container: {
        height: 70,
    },
    dateDiff: {
        fontSize: 12,
        opacity: '0.6',
    },
    divider: {
        backgroundColor: '#f2f2f2',
        height: 2,
        marginTop: 8,
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

LmcDocumentItem.propTypes = {
    data: PropTypes.object.isRequired,
    listId: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
}