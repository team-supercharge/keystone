import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ActionCreators } from '../../../actions/actions'

export class LmcResidentsNavbar extends Component {
    render () {
        return (
            <div style={styles.container}>
                
            </div>
        )
    }
}

const styles = {
    container: {
        flex: '4',
    }
}

LmcResidentsNavbar.propTypes = {
    selectedResident: PropTypes.string
}

const mapStateToProps = () => {
    return {
        selectedResident: state.residents.selectedResident,
    }
}

export default connect(mapStateToProps)(LmcResidentsNavbar)