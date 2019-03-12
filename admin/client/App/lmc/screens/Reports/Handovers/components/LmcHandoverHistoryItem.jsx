import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isBrowser, isTablet } from 'react-device-detect'
import { BlankState } from '../../../../../elemental'
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

    renderHandoverCarers = () => {
        const { createdBy, witnessedBy } = this.props.handover
        return (
            <div style={styles.carersContainer}>
                <div style={styles.carer}>
                    <span style={styles.name}>
                        By {createdBy.name.first} {createdBy.name.last}
                    </span>
                    <div 
                        className='lmc-profile-picture__handover__small'
                        style={{
                            ...styles.carerImage,
                            background: `url(${createdBy.picture || PLACEHOLDER_IMAGE})`
                        }}
                    />
                </div>
                <div style={styles.carer}>
                    <span style={styles.name}>
                        to {witnessedBy.name.first} {witnessedBy.name.last}
                    </span>
                    <div 
                        className='lmc-profile-picture__handover__small'
                        style={{
                            ...styles.carerImage,
                            background: `url(${witnessedBy.picture || PLACEHOLDER_IMAGE})`
                        }}
                    />
                </div>
            </div>
        )
    }

    renderData = () => {
        const { logsByResident, notes, seenBy } = this.props.handover
        const isEmpty = (!logsByResident.length && !notes.length)
        const isDesktopStyles = (isBrowser || isTablet)

        if (isEmpty) {
            return (
                <div style={styles.dataContainer}>
                    <BlankState
                        heading='Nothing to see here!'
                        style={{ width: 1000 }}
                    />
                </div>
            )
        }

        return (
            <div 
                style={{ 
                    ...styles.dataContainer,
                    flexDirection: isDesktopStyles ? 'row' : 'column'
                }}
            >
                { !isDesktopStyles && this.renderHandoverCarers() }
                <div style={isDesktopStyles ? styles.leftContainer : null}>
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
                <div style={isDesktopStyles ? styles.rightContainer : null}>
                    <LmcHandoverNotes
                        notes={notes}
                    />
                    <LmcSeenByList
                        seenBy={seenBy}
                    />
                </div>
            </div>
        )
    }

    render () {
        const { createdOn, createdBy, witnessedBy } = this.props.handover
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
                    { this.renderData() }
                </AnimateHeight>
            </div>
        )
    }
}

const PLACEHOLDER_IMAGE = 'https://s3.eu-west-2.amazonaws.com/lmc-data-production/public/profile_pic_placeholder.png';

const styles = {
    carer: {
        display: 'flex',
        flexDirection: 'row',
    },
    carerImage: {
        marginRight: 10,
    },
    carersContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: '10px 0px 20px 0px',
        margin: '0 auto',
    },
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
    name: {
        display: 'block',
        fontSize: 12,
        opacity: 0.8,
        padding: '10px 10px 0px 0px',
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