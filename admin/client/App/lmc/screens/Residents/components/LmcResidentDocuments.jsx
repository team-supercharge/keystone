import React, { Component } from 'react'
import { connect } from 'react-redux'

export class LmcResidentDocuments extends Component {
    render() {
        return (
            <div>Documents</div>
        )
    }
}

const mapStateToProps = (state) => {

}

export default connect(mapStateToProps)(LmcResidentDocuments)