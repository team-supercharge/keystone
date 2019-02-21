import React from 'react'
import PropTypes from 'prop-types'
import LmcDocumentItem from './LmcDocumentItem.jsx'

const LmcDocumentList = ({ documents, onDelete, listId }) => {
    return (
        <div>
            { Object.keys(documents).map(categoryName => (
                <div key={categoryName}>
                    <h2 style={styles.categoryName}>
                        {categoryName}
                    </h2>
                    <div className='lmc-theme-gradient' style={styles.divider} />
                    <ul style={styles.list}>
                        { documents[categoryName].map((document, i) => (
                            <LmcDocumentItem
                                key={i}
                                data={document}
                                listId={listId}
                                onDelete={onDelete}
                            />
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
    }
}

LmcDocumentList.propTypes = {
    documents: PropTypes.object,
    listId: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default LmcDocumentList