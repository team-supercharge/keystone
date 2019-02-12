import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActionCreators } from '../../../actions/actions'

export class LmcResidentReports extends Component {
    componentDidMount() {
        this.props.fetchLogs()
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedResident !== prevProps.selectedResident) {
            this.props.fetchLogs()
        } 
    }

    render() {
        return (
            <div>{JSON.stringify(this.props.logs)}</div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedResident: state.residents.selectedResident,
        logs: state.residents.selectedResidentLogs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLogs: () => dispatch(ActionCreators.loadResidentLogs())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LmcResidentReports)