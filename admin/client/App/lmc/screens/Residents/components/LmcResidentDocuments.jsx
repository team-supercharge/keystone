import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ActionCreators } from '../../../actions/actions'
import { BlankState } from '../../../../elemental'
import Selectors from '../../../selectors'
import LmcCreateButton from '../../../components/LmcCreateButton.jsx'
import LmcDocumentList from '../../../components/LmcDocumentList.jsx'

export class LmcResidentDocuments extends Component {
    state = {
        documentsFetchInterval: null
    }

    componentDidMount () {
        const { fetchDocuments } = this.props
        this.setState({ 
            documentsFetchInterval: setInterval(fetchDocuments, 600000)
        })
        fetchDocuments()
    }

    componentWillUnmount() {
        clearInterval(this.state.documentsFetchInterval)
    }

    render () {
        const { 
            documents, 
            deleteDocument, 
            fetchDocuments, 
            selectedResident 
        } = this.props
        const hasDocuments = !!Object.keys(documents).length

        return (
            <div>
                <LmcCreateButton
                    buttonText='Document'
                    listId='Document'
                    title='Add a Document'
                    onCreate={fetchDocuments}
                    prefillPath='resident'
                    prefillValue={selectedResident}
                    style={styles.addButton}
                />
                { hasDocuments ? (
                    <LmcDocumentList
                        documents={documents}
                        listId={'documents'}
                        onDelete={deleteDocument}
                    />
                ) : (
                    <BlankState
                        heading={NO_DOCUMENTS_MESSAGE}
                        style={styles.noDocumentsMessage}
                    />
                ) }
            </div>
        )
    }
}

const NO_DOCUMENTS_MESSAGE = "You haven't added any documents for this resident"

const styles = {
    addButton: {
        float: 'right',
        width: 200,
    },
    noDocumentsMessage: {
        position: 'relative',
        top: 50,
    },
}

LmcResidentDocuments.propTypes = {
    documents: PropTypes.object,
    fetchDocuments: PropTypes.func.isRequired,
    deleteDocument: PropTypes.func.isRequired,
    selectedResident: PropTypes.string,
}

const mapStateToProps = (state) => {
    return {
        documents: Selectors.getSelectedResidentDocuments(state),
        selectedResident: state.residents.selectedResident,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDocuments: () => dispatch(ActionCreators.loadList('documents')),
        deleteDocument: (id) => dispatch(ActionCreators.deleteDocument(id, 'documents')),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LmcResidentDocuments)