import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ActionCreators } from '../../../actions/actions'
import { BlankState } from '../../../../elemental'
import LmcSidebar from '../../../components/LmcSidebar.jsx'
import { LmcSpinner } from '../../../components';
import LmcTeamMemberProfile from './LmcTeamMemberProfile.jsx';

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
        return (
            <div>
                { this.props.selectedUser } 
            </div>
        )
    }

    render() {
        const { selectedUser, setSelectedUser, users } = this.props
        return (
            <div>
                { users ? (
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
                            <div style={styles.userInfoContainer}>
                                { !users.length ? (
                                    <BlankState
                                        heading={NO_USERS_MESSAGE}
                                        style={styles.noUsersMessage}
                                    />
                                ) : (
                                    <LmcTeamMemberProfile
                                        selectedUser={selectedUser}
                                    />
                                ) }
                            </div>
                        </div>
                    </div>
                ) : <LmcSpinner /> }
            </div>
        )
    }
}

const NO_USERS_MESSAGE = "You haven't added any team members yet"

const styles = {
    leftContainer: {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'row'
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