import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link } from 'react-router'
import { isBrowser, isTablet } from 'react-device-detect'
import moment from 'moment'
import { GlyphButton } from '../../../../elemental'
import Selectors from '../../../selectors'
import theme from '../../../../../theme'

export const LmcResidentProfile = ({ selectedResident, profile }) => {
    if (!profile) return null
    const editLink = `${Keystone.adminPath}/residents/${selectedResident}`
   
    return (
        <div>
            <div 
                className='lmc-profile-picture__large' 
                style={{ 
                    ...styles.image, 
                    background: `url(${profile.picture || PLACEHOLDER_IMAGE})` 
                }} 
            />
            <div className='lmc-profile-main-info'>
                { renderBasicInfo(profile) }
                <div style={styles.descriptionContainer}> 
                    <div style={styles.descriptionText}>
                        { profile.summary }
                    </div>
                </div>
                { renderEditButton(editLink) }
            </div>
        </div>
    )
}

const renderEditButton = (link) => {
    return (isBrowser || isTablet) ? (
        <GlyphButton
            component={Link}
            glyph='pencil'
            position='left'
            style={styles.editButton}
            to={link}
        >
            Edit
        </GlyphButton>
    ) : (
        <GlyphButton
            component={Link}
            glyph='pencil'
            position='default'
            style={styles.editButton}
            to={link}
        />
    )
}

const renderLocation = (isShowingLocation, location) => {
    if (!isShowingLocation) return null
    const labels = ['building', 'floor', 'room', 'bed']

    return (
        <div style={styles.locationContainer}>
            { labels.map((label, i) => {
                if (!location[label]) return null

                return (
                    <div 
                        key={i} 
                        style={styles.locationSubContainer}
                    >
                        <div style={styles.locationLabel}>
                            {label.toUpperCase()}
                        </div>
                        <div style={styles.locationValue}>
                            {location[label]}
                        </div>
                    </div>
                )
            }) }
        </div>
    )
}

const renderNames = (profile) => {
    const displayName = profile.preferredName
        ? profile.preferredName
        : profile.name.first

    return (
        <div style={styles.namesContainer}>
            <span style={styles.displayName}>
                {displayName}
            </span>
            <span style={styles.basicInfoText}>
                {`${profile.name.first} ${profile.name.last}`}
            </span>
        </div>
    )
}

const renderBasicInfo = (profile) => {
    const birthday = moment(profile.dateOfBirth).format('Do MMMM YYYY')
    const age = moment().diff(profile.dateOfBirth, 'years')
    const isShowingLocation = !!Object.keys(profile.location).length

    return (
        <div style={styles.basicInfoContainer}>
            { renderNames(profile) }
            <span style={styles.basicInfoText}>
                {birthday} (
                    <span style={styles.highlightText}>
                        {age}
                    </span>
                )
            </span>
            <span style={{ ...styles.basicInfoText, marginTop: 20 }}>            
                {_.capitalize(profile.status)}
            </span>
            { isShowingLocation 
                ? <div style={styles.divider} /> 
                : null }
            { renderLocation(isShowingLocation, profile.location) }
            <div style={styles.divider} /> 
        </div> 
    )
}

const PLACEHOLDER_IMAGE = 'https://s3.eu-west-2.amazonaws.com/lmc-data-production/public/profile_pic_placeholder.png';

const styles = {
    basicInfoContainer: {
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        justifyContent: 'center'
    },
    basicInfoText: {
        color: '#999999',
        fontSize: 18,
        fontWeight: 300,
    },
    descriptionContainer: {
        flex: '1',
        marginTop: 20,
    },
    descriptionText: {
        margin: 'auto',
        width: '90%',
    },
    displayName: {
        fontWeight: 600,
        fontSize: 24,
    },
    divider: {
        background: theme.color.gray05,
        height: 1,
        margin: 'auto',
        marginTop: 20,
        marginBottom: 20,
        width: '90%',
    },
    editButton: {
        float: 'right',
        position: 'absolute',
        top: 20,
        right: 20,
    },
    highlightText: {
        color: 'black'
    },
    image: {
        position: 'relative',
        zIndex: 1,
    },
    locationContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: '0 auto',
    },
    locationLabel: {
        color: '#999999',
        fontSize: 9,
        fontWeight: 600,
    },
    locationSubContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: '10px 5px 10px 5px',
    },
    locationValue: {
        backgroundColor: theme.color.info,
        borderRadius: 1000,
        color: 'white',
        padding: '2px 20px 2px 20px',
        fontSize: 16,
        fontWeight: 300,
        float: 'left',
    },
    namesContainer: {
        display: 'flex',
        flexDirection: 'column',
    }
}

LmcResidentProfile.propTypes = {
    selectedResident: PropTypes.string.isRequired,
    profile: PropTypes.object,
}

const mapStateToProps = (state) => {
    return {
        selectedResident: state.residents.selectedResident,
        profile: Selectors.getSelectedResidentProfile(state),
    }
}

export default connect(mapStateToProps)(LmcResidentProfile)