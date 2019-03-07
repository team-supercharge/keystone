import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActionCreators } from '../../../actions/actions'
import { connect } from 'react-redux'
import Selectors from '../../../selectors'
import { BlankState } from '../../../../elemental'
import LmcCreateButton from '../../../components/LmcCreateButton.jsx'
import LmcDocumentList from '../../../components/LmcDocumentList.jsx'

export class LmcOrganisationDocuments extends Component {
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

    componentWillUnmount () {
        clearInterval(this.state.documentsFetchInterval)
    }

    render () {
        const { documents, deleteDocument, fetchDocuments } = this.props
        const hasDocuments = !!Object.keys(documents).length

        return (
            <div style={styles.mainContainer}>
                <div style={styles.content}>
                    <LmcCreateButton
                        buttonText='Document'
                        title='Add a Document'
                        listId='HomeDocument'
                        onCreate={fetchDocuments}
                        style={styles.createButton}
                    />
                    { hasDocuments ? (
                        <LmcDocumentList
                            documents={documents}
                            listId='home-documents'
                            onDelete={deleteDocument}
                        />
                    ) : (
                        <BlankState
                            heading={NO_DOCUMENTS_MESSAGE}
                            style={styles.noDocumentsMessage}
                        />
                    )}
                </div>
            </div>
        )
    }
}

const NO_DOCUMENTS_MESSAGE = "You haven't added any documents for your home yet"

const styles = {
    createButton: {
        float: 'right',
        width: '15vw',
    },
    content: {
        maxWidth: 1000,
        margin: '0 auto',
    },
    mainContainer: {
        overflow: 'auto',
        height: '85vh',
        padding: '50px 20px 0px 20px',
    },
    noDocumentsMessage: {
        position: 'relative',
        top: 50,
    }
}

LmcOrganisationDocuments.propTypes = {
    documents: PropTypes.object,
    deleteDocument: PropTypes.func.isRequired,
    fetchDocuments: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    return {
        documents: Selectors.groupHomeDocuments(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDocuments: () => dispatch(ActionCreators.loadList('home-documents')),
        deleteDocument: (id) => dispatch(ActionCreators.deleteDocument(id, 'home-documents')),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LmcOrganisationDocuments)