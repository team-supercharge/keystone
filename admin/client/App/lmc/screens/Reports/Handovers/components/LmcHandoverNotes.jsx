import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LmcHandoverNoteCard from './LmcHandoverNoteCard.jsx';

export default class LmcHandoverNotes extends Component {
    render() {
        return (
            <div style={styles.mainContainer}>
                { this.props.notes.map((note, i) => {
                    return (
                        <LmcHandoverNoteCard
                            key={i}
                            note={note}
                        />
                    )
                })}
                {// if we want to edit notes (i.e. on current handover), 
                // we can render this here if props.edit === true
                }
            </div>
    
            
        )
    }
}

const styles = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
}

LmcHandoverNotes.propTypes = {
    notes: PropTypes.array.isRequired
}