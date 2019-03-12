import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const LmcHandoverNoteCard = ({ note }) => {
    const carer = note.carer
    return (
        <div 
            style={styles.noteContainer}
        >
            <div style={styles.topContainer}>
                <div style={styles.carerContainer}>
                    <div 
                        className="lmc-profile-picture__handover__small" 
                        style={{
                            background: `url(${carer.picture || PLACEHOLDER_IMAGE})` 
                        }} 
                    />
                    <span style={styles.carerName}>
                        {carer.name.first} {carer.name.last}
                    </span>
                </div>
                <div style={styles.timeContainer}>
                    { moment(note.createdOn).format('HH:mm ddd') }
                </div>
            </div>
            <div style={styles.textContainer}>
                { note.note }
            </div>
        </div>
    )
}

const PLACEHOLDER_IMAGE = 'https://s3.eu-west-2.amazonaws.com/lmc-data-production/public/profile_pic_placeholder.png';

const styles = {
    carerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    carerName: {
        fontSize: 14,
        position: 'relative',
        opacity: 0.5,
        top: 7,
        left: 15,
        margin: 0
    },
    noteContainer: {
        background: 'white',
        borderRadius: 10,
        border: '1px #eaeaea solid',
        marginBottom: '0.6em',
        minHeight: 100,
        padding: 10,
        width: '100%',
    },
    textContainer: {
        fontSize: 12,
        opacity: 0.8,
        paddingTop: 10,
    },
    timeContainer: {
        fontSize: 12,
        opacity: 0.5,
        padding: '7px 7px 0px 0px',
    },
    topContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}

LmcHandoverNoteCard.propTypes = {
    note: PropTypes.object.isRequired
}

export default LmcHandoverNoteCard