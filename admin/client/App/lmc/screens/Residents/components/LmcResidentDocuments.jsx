import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ActionCreators } from '../../../actions/actions'
import { BlankState } from '../../../../elemental'
import Selectors from '../../../selectors'
import LmcDocumentItem from './LmcDocumentItem.jsx'

export class LmcResidentDocuments extends Component {
    componentDidMount () {
        this.props.fetchDocuments()
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
            Object.keys(this.props.documents).map(category => (
                <div key={category}>
                    <span>
                        {category}
                    </span>
                    <ul style={styles.list}>
                        { this.listDocumentsByCategory(category) }
                    </ul>
                </div>
            ))
        )
    }

    render () {
        const { documents } = this.props
        const hasDocuments = !!Object.keys(documents).length

        return (
            <div>
                {hasDocuments ? (
                    this.renderDocuments()
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

const NO_DOCUMENTS_MESSAGE = "You haven't added any documents for this resident"

const styles = {
    documentContainer: {
        display: 'inline-block',
    },
    list: {
        listStyle: 'none',
        listStyleType: 'none',
        padding: 0,
    },
    noDocumentsMessage: {
        margin: 50,
        padding: 60,
    }
}

LmcResidentDocuments.propTypes = {
    documents: PropTypes.object,
    fetchDocuments: PropTypes.func.isRequired,
    deleteDocument: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        documents: Selectors.getSelectedResidentDocuments(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDocuments: () => dispatch(ActionCreators.loadList('documents')),
        deleteDocument: (id) => dispatch(ActionCreators.deleteDocument(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LmcResidentDocuments)