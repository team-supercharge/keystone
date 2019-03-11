import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActionCreators } from '../../../actions/actions'
import { connect } from 'react-redux'
import { BlankState } from '../../../../elemental'
import Swal from 'sweetalert2'
import LmcSpinner from '../../../components/LmcSpinner.jsx'
import LmcHandoversHistory from './components/LmcHandoversHistory.jsx'
import LmcCurrentHandover from './components/LmcCurrentHandover.jsx';

export class LmcHandoversDashboard extends Component {
    componentDidMount () {
        this.props.fetchCurrentHandover()
    }

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
        const { currentHandover, handoverHistory } = this.props

        if (!Keystone.user.features.handovers) {
            return <div>{ this.showProAlert() }</div>
        }
        if (!handoverHistory || !currentHandover) {
            return <div><LmcSpinner /></div>
        }

        const { logs, notes } = currentHandover

        if (!handoverHistory.length && !logs.length && !notes.length) {
            return (
                <div>
                    <BlankState
                        heading='No handovers information found...'
                    />
                </div>
            )
        }
        return (
            <div>
                <LmcCurrentHandover
                    logs={logs}
                    notes={notes}
                />
                <LmcHandoversHistory
                    handovers={handoverHistory}
                />
            </div>
        )
    }
}

LmcHandoversDashboard.propTypes = {
    currentHandover: PropTypes.object,
    fetchCurrentHandover: PropTypes.func.isRequired,
    handoverHistory: PropTypes.array
}

const mapStateToProps = (state) => {
    return {
        currentHandover: state.handovers.current,
        handoverHistory: state.data.handovers,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCurrentHandover: () => dispatch(ActionCreators.fetchCurrentHandover()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LmcHandoversDashboard)