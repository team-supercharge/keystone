import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ActionCreators } from '../../../actions/actions'
import LmcSidebar from '../../../components/LmcSidebar.jsx'
import { LmcSpinner } from '../../../components';

export class LmcTeamScreen extends Component {
    onCreate = () => {
        return
    }

    render() {
        const { selectedUser, setSelectedUser, users } = this.props
        console.log(users)
        return (
            <div>
                { users ? (
                    <div style={styles.mainContainer}>
                        <div style={styles.leftContainer}>
                            <LmcSidebar
                                itemLabel='Team Member'
                                listId='User'
                                items={users}
                                onCreate={this.onCreate}
                                selectedItem={selectedUser}
                                setSelectedItem={setSelectedUser}
                                title='Team Members'
                            />
                        </div>
                        <div style={styles.rightContainer}>
                        </div>
                    </div>
                ) : <LmcSpinner /> }
            </div>
        )
    }
}

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
    rightContainer: {
        flex: '3.5'
    },
}

LmcTeamScreen.propTypes = {
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
        setSelectedUser: (id) => dispatch(ActionCreators.setSelectedUser(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LmcTeamScreen)