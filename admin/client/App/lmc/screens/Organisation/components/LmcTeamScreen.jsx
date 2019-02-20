import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LmcSidebar from '../../../components/LmcSidebar.jsx'

export class LmcTeamScreen extends Component {
    onCreate = () => {
        return
    }

    render() {
        return (
            <div style={styles.mainContainer}>
                <div style={styles.leftContainer}>
                    <LmcSidebar
                        itemLabel='Team Member'
                        listId='User'
                        items={[]}
                        onCreate={this.onCreate}
                        selectedItem={''}
                        setSelectedItem={() => {}}
                        title='Team Members'
                    />
                </div>
                <div style={styles.rightContainer}>
                </div>
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

LmcTeamScreen.propTypes = {}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LmcTeamScreen)