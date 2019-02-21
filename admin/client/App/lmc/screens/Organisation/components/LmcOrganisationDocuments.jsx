import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActionCreators } from '../../../actions/actions'
import { connect } from 'react-redux'
import { BlankState } from '../../../../elemental'
import LmcCreateButton from '../../../components/LmcCreateButton.jsx'

export class LmcOrganisationDocuments extends Component {
    renderDocuments = () => {
        return (
            <div>
                { JSON.stringify(this.props.documents) }
            </div>
        )
    }

    render() {
        const { documents, fetchDocuments } = this.props
        const hasDocuments = documents && documents.length

        return (
            <div style={styles.mainContainer}>
                <LmcCreateButton
                    buttonText='Document'
                    title='Add a Document'
                    listId='HomeDocument'
                    onCreate={fetchDocuments}
                    style={styles.createButton}
                />
                { hasDocuments ? (
                    <div>
                        { this.renderDocuments() }
                    </div>
                ) : (
                    <BlankState
                        heading={NO_DOCUMENTS_MESSAGE}
                        style={styles.noDocumentsMessage}
                    />
                )}
            </div>
        )
    }
}

const NO_DOCUMENTS_MESSAGE = "You haven't added any documents for your home yet"

const styles = {
    createButton: {
        float: 'right',
        width: 200,
    },
    mainContainer: {
        
    },
    noDocumentsMessage: {

    }
}

LmcOrganisationDocuments.propTypes = {
    documents: PropTypes.array,
    fetchDocuments: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        documents: state.data['home-documents']
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDocuments: () => dispatch(ActionCreators.loadList('home-documents'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LmcOrganisationDocuments)