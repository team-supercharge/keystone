import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ActionCreators } from '../../../actions/actions'
import { BlankState } from '../../../../elemental'
import Selectors from '../../../selectors'
import LmcDocumentItem from './LmcDocumentItem.jsx'
import LmcCreateButton from '../../../components/LmcCreateButton.jsx'

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

    listDocumentsByCategory = category => {
        const { documents, deleteDocument } = this.props
        return (
            documents[category].map((document, i) => (
                <LmcDocumentItem
                    key={i}
                    data={document}
                    onDelete={deleteDocument}
                />
            ))
        )
    }

    renderDocuments = () => {
        return (
            Object.keys(this.props.documents).map(categoryName => (
                <div key={categoryName}>
                    <h2 style={styles.categoryName}>
                        {categoryName}
                    </h2>
                    <div className='lmc-theme-gradient' style={styles.divider} />
                    <ul style={styles.list}>
                        { this.listDocumentsByCategory(categoryName) }
                    </ul>
                </div>
            ))
        )
    }

    render () {
        const { documents, fetchDocuments, selectedResident } = this.props
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
                    <div>
                        { this.renderDocuments() }
                    </div>
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
    categoryName: {
        marginBottom: '0.3em',
        fontWeight: 300,
    },
    divider: {
        height: 2,
        marginBottom: 22,
        width: '100%',
    },
    documentContainer: {
        display: 'inline-block',
    },
    list: {
        listStyle: 'none',
        listStyleType: 'none',
        padding: 0,
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
        deleteDocument: (id) => dispatch(ActionCreators.deleteDocument(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LmcResidentDocuments)