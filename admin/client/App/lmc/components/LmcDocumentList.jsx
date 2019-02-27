import React from 'react'
import PropTypes from 'prop-types'
import LmcDocumentItem from './LmcDocumentItem.jsx'

const LmcDocumentList = ({ documents, onDelete, listId }) => {
    return (
        <div>
            { Object.keys(documents).map(categoryName => (
                <div key={categoryName} style={styles.container}>
                    <h2 style={styles.categoryName}>
                        {categoryName}
                    </h2>
                    <div className='lmc-theme-gradient' style={styles.divider} />
                    <ul style={styles.list}>
                        { documents[categoryName].map((document, i) => (
                            <div>
                                <LmcDocumentItem
                                    key={i}
                                    data={document}
                                    listId={listId}
                                    onDelete={onDelete}
                                />
                                <div style={styles.subDivider} />
                            </div>
                        )) }
                    </ul>
                </div>
            )) }
        </div>
    )
}

const styles = {
    categoryName: {
        marginBottom: '0.3em',
        fontWeight: 300,
        textOverflow: 'ellipsis',
        hyphens: 'auto',
    },
    container: {
        marginBottom: 40,
    },
    divider: {
        height: 2,
        marginBottom: 22,
        width: '100%',
    },
    list: {
        listStyle: 'none',
        listStyleType: 'none',
        padding: 0,
    },
    subDivider: {
        backgroundColor: '#f2f2f2',
        height: 2,
        marginTop: 8,
        marginBottom: 12
    },
}

LmcDocumentList.propTypes = {
    documents: PropTypes.object,
    listId: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default LmcDocumentList