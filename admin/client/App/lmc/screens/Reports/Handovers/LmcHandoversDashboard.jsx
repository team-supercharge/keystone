import React, { Component } from 'react'
import { ActionCreators } from '../../../actions/actions'
import Selectors from '../../../selectors'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'

export class LmcHandoversDashboard extends Component {
    showProAlert = () => {
        Swal.fire({
            title: 'Whoops!',
            html: 'You need to enable PRO mode to access this feature.<br>For more information, <a href="https://logmycare.co.uk/pricing/" target="_blank">click here.</a>',
            type: 'info',
            confirmButtonClass: 'lmc-custom-notification-confirm',
            onClose: () => this.props.router.goBack()
        })
    }

    render () {
        if (!Keystone.user.features.handovers) {
            return <div>{ this.showProAlert() }</div>
        }

        return (
            <div>
                Handovers
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LmcHandoversDashboard)