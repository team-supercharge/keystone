import React from 'react'
import PropTypes from 'prop-types'

const LmcHandoverNoteCard = ({ note }) => {
    const carer = note.carer

    return (
        <div 
            style={styles.noteContainer}
        >
            <div style={styles.carerContainer}>
                <div 
                    className="lmc-profile-picture__handover__small" 
                    style={{
                        background: `url(${carer.picture || PLACEHOLDER_IMAGE})` 
                    }} 
                />
                <span style={styles.carerName}>
                    { `${carer.name.first} ${carer.name.last}` }
                </span>
            </div>
        </div>
    )
}

const PLACEHOLDER_IMAGE = 'https://s3.eu-west-2.amazonaws.com/lmc-data-production/public/profile_pic_placeholder.png';

const styles = {
    carerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    carerName: {
        fontSize: 14,
        opacity: 0.6,
        position: 'relative',
        top: 6,
        left: 15,
        margin: 0
    },
    noteContainer: {
        background: 'white',
        borderRadius: 10,
        border: '1px #999999 solid',
        width: '100%',
    },
}

LmcHandoverNoteCard.propTypes = {
    note: PropTypes.object.isRequired
}

export default LmcHandoverNoteCard