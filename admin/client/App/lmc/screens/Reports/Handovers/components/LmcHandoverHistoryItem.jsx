import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AnimateHeight from 'react-animate-height'
import LmcHandoverResidentItem from './LmcHandoverResidentItem.jsx'
import LmcHandoverNotes from './LmcHandoverNotes.jsx'
import LmcHandoverTitleBar from './LmcHandoverTitleBar.jsx'
import LmcSeenByList from './LmcSeenByList.jsx'

export default class LmcHandoverHistoryItem extends Component {
    state = {
        isShowingContent: false
    }

    toggleContent = () => {
        this.setState(prevState => ({
            isShowingContent: !prevState.isShowingContent
        }))
    }

    render () {
        const { 
            logsByResident, 
            notes, 
            seenBy, 
            createdOn, 
            createdBy, 
            witnessedBy 
        } = this.props.handover

        return (
            <div>
                <LmcHandoverTitleBar
                    createdOn={createdOn}
                    createdBy={createdBy}
                    witnessedBy={witnessedBy}
                    onClick={this.toggleContent}
                />
                <AnimateHeight
                    duration={ 500 }
                    height={ this.state.isShowingContent ? 'auto' : 0 }
                >
                    <div style={styles.dataContainer}>
                        <div style={styles.leftContainer}>
                            { logsByResident.map((logGroup, i) => {
                                return (
                                    <div key={i}>
                                        <LmcHandoverResidentItem
                                            data={logGroup}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                        <div style={styles.rightContainer}>
                            <LmcHandoverNotes
                                notes={notes}
                            />
                            <LmcSeenByList
                                seenBy={seenBy}
                            />
                        </div>
                    </div>
                </AnimateHeight>
            </div>
            
        )
    }
}

const styles = {
    dataContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        borderBottom: '1px #eaeaea solid',
        marginBottom: 10,
    },
    leftContainer: {
        width: '60%',
        paddingRight: 20
    },
    rightContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '40%',
        flex: '1'
    },
}

LmcHandoverHistoryItem.propTypes = {
    handover: PropTypes.object.isRequired
}