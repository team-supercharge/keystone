import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class LmcPasswordsScreen extends Component {
    render() {
        return (
            <div style={{ padding: 50 }}>
                <table cellPadding="0" cellSpacing="0" className="Table ItemList">
					<thead>
                        <tr>
                            <th>
                                Title
                            </th>
                            <th>
                                Start
                            </th>
                            <th>
                                End
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Shift 1
                            </td>
                            <td>
                                08:99
                            </td>
                            <td>
                                13:22
                            </td>
                        </tr>
                    </tbody>
				</table>
            </div>
        )
    }
}

LmcPasswordsScreen.propTypes = {}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LmcPasswordsScreen)