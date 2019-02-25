import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ActionCreators } from '../../../actions/actions'
import { isBrowser, isTablet } from 'react-device-detect'
import { BlankState, GlyphButton } from '../../../../elemental'
import LmcSidebar from '../../../components/LmcSidebar.jsx'
import { LmcSpinner } from '../../../components'
import LmcTeamMemberProfile from './LmcTeamMemberProfile.jsx'

export class LmcTeamScreen extends Component {
    componentDidMount () {
        this.props.fetchUsers()
    }
    
    onCreateUserComplete = (user) => {
        const { setSelectedUser, fetchUsers } = this.props
        fetchUsers()
        setSelectedUser(user.id)
    }

    renderUserInfo = () => {
        const { selectedUser, users } = this.props
        return (
            <div style={styles.userInfoContainer}>
                { users.length ? (
                    <LmcTeamMemberProfile
                        selectedUser={selectedUser}
                    />
                ) : (
                    <BlankState
                        heading={NO_USERS_MESSAGE}
                        style={styles.noUsersMessage}
                    />
                ) }
             </div>
        )
    }
    
    renderDesktop = () => {
        const { selectedUser, setSelectedUser, users } = this.props
        return (
            <div style={styles.mainContainer}>
                <div style={styles.leftContainer}>
                    <LmcSidebar
                        itemLabel='Team Member'
                        listId='User'
                        items={users}
                        onCreate={this.onCreateUserComplete}
                        selectedItem={selectedUser}
                        setSelectedItem={setSelectedUser}
                        title='Team Members'
                        styles={styles.sidebar}
                    />
                </div>
                <div style={styles.rightContainer}>
                    { this.renderUserInfo() }
                </div>
            </div>
        )
    }

    renderMobile = () => {
        const { selectedUser, setSelectedUser, users } = this.props
        return (
            <div>
                { !selectedUser ? (
                    <LmcSidebar
                        itemLabel='Team Member'
                        listId='User'
                        items={users}
                        onCreate={this.onCreateUserComplete}
                        selectedItem={null}
                        setSelectedItem={setSelectedUser}
                        title='Team Members'
                        styles={styles.sidebar}
                    />
                ) : (
                    <div style={styles.mobileContainer}>
                        <GlyphButton
                            glyph="chevron-left"
                            position="left"
                            style={styles.backLink}
                            onClick={() => setSelectedUser(null)}
                            variant="link"
                        >
                            Back
                        </GlyphButton>
                        { this.renderUserInfo() }
                    </div>
                )}
            </div>
        )
    }

    render() {
        const chosenRender = (isBrowser || isTablet) ? this.renderDesktop : this.renderMobile
        return this.props.users ? chosenRender() : <LmcSpinner />
    }
}

const NO_USERS_MESSAGE = "You haven't added any team members yet"

const styles = {
    backLink: {
        paddingLeft: 0,
        paddingRight: 0,
        position: 'relative',
        top: 10,
        left: 10,
    },
    leftContainer: {
        flex: '1',
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    mobileContainer: {
        height: '83vh',
        overflow: 'scroll',
        wordWrap: 'break-word',
    },
    noUsersMessage: {
        padding: 60,
    },
    rightContainer: {
        flex: '3.5',
        height: '83vh',
        overflow: 'scroll',
        wordWrap: 'break-word',
    },
    sidebar: { 
        height: '83vh', 
        maxHeight: '83vh' 
    },
    userInfoContainer: {
        maxWidth: 800,
        margin: '0 auto',
        padding: '50px 0px 0px 0px',
    }
}

LmcTeamScreen.propTypes = {
    fetchUsers: PropTypes.func.isRequired,
    selectedUser: PropTypes.string,
    setSelectedUser: PropTypes.func.isRequired,
    users: PropTypes.array
}

const mapStateToProps = state => {
    return {
        selectedUser: state.users.selectedUser,
        users: state.data.carers,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSelectedUser: (id) => dispatch(ActionCreators.setSelectedUser(id)),
        fetchUsers: () => dispatch(ActionCreators.loadList('carers'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LmcTeamScreen)