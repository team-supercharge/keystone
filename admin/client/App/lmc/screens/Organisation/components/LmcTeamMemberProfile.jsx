import React from 'react'
import PropTypes from 'prop-types'
import Selectors from '../../../selectors/index'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { GlyphButton } from '../../../../elemental'

export const LmcTeamMemberProfile = ({ profile, selectedUser }) => {
    if (!profile) return null
    const editLink = `${Keystone.adminPath}/users/${selectedUser}`
    const role = profile.role === 'carer' ? 'Carer' : 'Carehome Admin'

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
                        { `${profile.name.first} ${profile.name.last}` }
                    </span>
                    <span style={styles.basicInfoText}>
                        Role: { role }
                    </span>
                    <span style={styles.basicInfoText} >
                        { profile.email }
                    </span>
                    <span style={{ ...styles.basicInfoText, marginTop: 20 }}>
                        { `${profile.logCount} logs this month` }
                    </span>
                </div>
                <GlyphButton
                    component={Link}
                    glyph='pencil'
                    position='left'
                    style={styles.editButton}
                    to={editLink}
                >
                    Edit
                </GlyphButton>
            </div>
        </div>
    )
}

const PLACEHOLDER_IMAGE = 'https://s3-eu-west-2.amazonaws.com/lmc-marketing-public/wp-content/uploads/2018/04/12092141/profile_pic_placeholder.png'

const styles = {
    basicInfoContainer: {
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    basicInfoText: {
        color: '#999999',
        fontSize: 18,
        fontWeight: 300,
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

LmcTeamMemberProfile.propTypes = {
    selectedUser: PropTypes.string.isRequired,
    profile: PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        profile: Selectors.getSelectedUserProfile(state)
    }
}

export default connect(mapStateToProps)(LmcTeamMemberProfile)