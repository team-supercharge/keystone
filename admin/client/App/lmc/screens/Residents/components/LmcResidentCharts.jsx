import React, { Component } from 'react'
import { connect } from 'react-redux'

export class LmcResidentCharts extends Component {
    render() {
        return (
            <div>Charts</div>
        )
    }
}

const mapStateToProps = (state) => {

}

export default connect(mapStateToProps)(LmcResidentCharts)