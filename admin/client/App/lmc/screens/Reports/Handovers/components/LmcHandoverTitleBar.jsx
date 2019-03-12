import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isBrowser, isTablet } from 'react-device-detect'
import { GlyphButton } from '../../../../../elemental'

export default class LmcHandoverTitleBar extends Component {
    state = {
        isClicked: false
    }

    handleClick = () => {
        this.setState(prevState => ({
            isClicked: !prevState.isClicked
        }))
        this.props.onClick()
    }

    formatTimePeriod = () => {   
        const splitAfternoon = 12; // 24hr time to split the afternoon
        const splitEvening = 17; // 24hr time to split the evening
        const hour = parseFloat(moment(this.props.createdOn).format('HH'));
        
        if (hour >= splitAfternoon && hour <= splitEvening) {
            // Between 12 PM and 5PM
            return 'Afternoon';
        } else if (hour >= splitEvening) {
            // Between 5PM and Midnight
            return 'Evening';
        }
        // Between dawn and noon
        return 'Morning';
    }

    renderCarers = () => {
        const { createdBy, witnessedBy } = this.props
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
    
    render () { 
        const isDesktopStyles = (isBrowser || isTablet)
        return (
            <div 
                onClick={this.handleClick}
                style={styles.container}
            >
                <div style={styles.handoverTime}>
                    {`${this.formatTimePeriod()} at ${moment(this.props.createdOn).format('HH:mm')}`}
                </div>
                <div style={styles.rightContainer}>
                    { isDesktopStyles && this.renderCarers() }
                    <GlyphButton
                        className='lmc-collapse-button'
                        glyph={this.state.isClicked ? 'chevron-up' : 'chevron-down'}
                        style={styles.glyph}
                    />
                </div>
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
    },
    container: {
        borderBottom: '1px #eaeaea solid',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
        marginBottom: 10,
        width: '100%',
    },
    glyph: {
        paddingBottom: 10
    },
    handoverTime: {
        height: '100%',
        paddingTop: 10,
        textOverflow: 'ellipsis',
        hyphens: 'auto',
    },
    name: {
        display: 'block',
        fontSize: 12,
        opacity: 0.8,
        padding: '10px 10px 0px 0px',
    },
    rightContainer: {
        display: 'flex',
        flexDirection: 'row'
    }
}

LmcHandoverTitleBar.propTypes = {
    createdOn: PropTypes.string.isRequired,
    createdBy: PropTypes.object.isRequired,
    witnessedBy: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
}