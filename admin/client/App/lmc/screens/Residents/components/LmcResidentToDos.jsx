import React, { Component } from 'react'
import { connect } from 'react-redux'

export class LmcResidentToDos extends Component {
    render() {
        return (
            <div>To-Dos</div>
        )
    }
}

const mapStateToProps = (state) => {

}

export default connect(mapStateToProps)(LmcResidentToDos)