import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActionCreators } from '../../../actions/actions'
import { connect } from 'react-redux'
import { BlankState } from '../../../../elemental'
import Swal from 'sweetalert2'
import LmcSpinner from '../../../components/LmcSpinner.jsx'
import LmcHandoversHistory from './LmcHandoversHistory.jsx'
import LmcCurrentHandover from './LmcCurrentHandover.jsx';

export class LmcHandoversDashboard extends Component {
    componentDidMount () {
        const { fetchCurrentHandoverLogs, fetchCurrentHandoverNotes } = this.props
        fetchCurrentHandoverLogs()
        fetchCurrentHandoverNotes()
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
        const { 
            handoverHistory, 
            currentHandoverLogs, 
            currentHandoverNotes 
        } = this.props

        if (!Keystone.user.features.handovers) {
            return <div>{ this.showProAlert() }</div>
        }
        if (!handoverHistory || !currentHandoverLogs || !currentHandoverNotes) {
            return <div><LmcSpinner /></div>
        }
        if (!handoverHistory.length && 
            !currentHandoverLogs.length && 
            !currentHandoverNotes.length) {
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
                    logs={currentHandoverLogs}
                    notes={currentHandoverNotes}
                />
                <LmcHandoversHistory
                    handovers={handoverHistory}
                />
            </div>
        )
    }
}

LmcHandoversDashboard.propTypes = {
    currentHandoverLogs: PropTypes.array,
    currentHandoverNotes: PropTypes.array,
    fetchCurrentHandoverLogs: PropTypes.func.isRequired,
    fetchCurrentHandoverNotes: PropTypes.func.isRequired,
    handoverHistory: PropTypes.array
}

const mapStateToProps = (state) => {
    return {
        currentHandoverLogs: state.handovers.currentLogs,
        currentHandoverNotes: state.handovers.currentNotes,
        handoverHistory: state.data.handovers,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCurrentHandoverLogs: () => dispatch(ActionCreators.fetchCurrentHandoverLogs()),
        fetchCurrentHandoverNotes: () => dispatch(ActionCreators.fetchCurrentHandoverNotes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LmcHandoversDashboard)