import React, { Component } from 'react'
import { connect } from 'react-redux'
import Selectors from '../../../selectors'

export class LmcResidentDocuments extends Component {
    render() {
        console.log(this.props)
        return (
            <div>{JSON.stringify(this.props.documents)}</div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        documents: Selectors.getSelectedResidentDocuments(state)
    }
}

export default connect(mapStateToProps)(LmcResidentDocuments)