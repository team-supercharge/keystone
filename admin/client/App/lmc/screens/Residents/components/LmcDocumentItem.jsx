import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '../../../../elemental'

const LmcDocumentItem = ({ data }) => {
    return (
        <li>
            <div style={styles.container}>
                <span style={styles.documentName}>
                    {data.name}
                </span>
                <Button color='default'>
                    <a
                        href={data.pdf}
                        style={styles.linkButtonText}
                        target='_blank'
                    >
                        View
                    </a>
                </Button>
            </div>
        </li>
    )
}

const styles = {
    container: {
        display: 'inline-block',
    },
    documentName: {

    },
    linkButtonText: {
        color: 'black',
        textDecoration: 'none',
    }
}

LmcDocumentItem.propTypes = {
    data: PropTypes.object.isRequired,
}

export default LmcDocumentItem
