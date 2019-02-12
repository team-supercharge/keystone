import React, { Component } from 'react'
import { connect } from 'react-redux'

export class LmcResidentReports extends Component {
    render() {
        return (
            <div>Daily Reports</div>
        )
    }
}

const mapStateToProps = (state) => {

}

export default connect(mapStateToProps)(LmcResidentReports)