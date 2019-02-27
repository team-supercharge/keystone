import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link } from 'react-router'
import { isBrowser, isTablet } from 'react-device-detect'
import moment from 'moment'
import { GlyphButton } from '../../../../elemental'
import Selectors from '../../../selectors'

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

export const LmcResidentProfile = ({ selectedResident, profile }) => {
    if (!profile) return null
    const editLink = `${Keystone.adminPath}/residents/${selectedResident}`
    const birthday = moment(profile.dateOfBirth).format('Do MMMM YYYY')
    const age = moment().diff(profile.dateOfBirth, 'years')

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
                <div style={styles.basicInfoContainer}>
                    <span style={styles.name}>
                        {`${profile.name.first} ${profile.name.last}`}
                    </span>
                    <span style={styles.basicInfoText}>
                        {birthday} (
                            <span style={styles.age}>
                                {age}
                            </span>
                        )
                    </span>
                    <span style={{
                        ...styles.basicInfoText,
                        marginTop: 20
                    }}>
                            Status: {_.capitalize(profile.status)}
                    </span>
                    <div style={styles.divider} />
                </div>
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

const PLACEHOLDER_IMAGE = 'https://s3-eu-west-2.amazonaws.com/lmc-marketing-public/wp-content/uploads/2018/04/12092141/profile_pic_placeholder.png';

const styles = {
    age: {
        color: 'black'
    },
    basicInfoContainer: {
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
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
    divider: {
        background: '#f2f2f2',
        height: 1,
        margin: 'auto',
        marginTop: 20,
        width: '90%',
    },
    editButton: {
        float: 'right',
        position: 'absolute',
        top: 20,
        right: 20,
    },
    image: {
        position: 'relative',
        zIndex: 1,
    },
    name: {
        fontWeight: 600,
        fontSize: 24,
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