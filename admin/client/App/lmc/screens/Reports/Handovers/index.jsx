import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActionCreators } from '../../../actions/actions'
import Selectors from '../../../selectors'
import { connect } from 'react-redux'
import { BlankState } from '../../../../elemental'
import LmcSpinner from '../../../components/LmcSpinner.jsx'
import LmcHandoversHistory from './components/LmcHandoversHistory.jsx'
import LmcCurrentHandover from './components/LmcCurrentHandover.jsx';
import { showProAlert } from '../../../common/notifications';

export class LmcHandoversDashboard extends Component {
    componentDidMount () {
        this.props.fetchCurrentHandover()
    }

    render () {
        const { currentHandover, handoverHistory } = this.props
        if (!Keystone.user.features.handovers) {
            return <div>{ showProAlert(this) }</div>
        }
        if (!handoverHistory || !currentHandover) {
            return <div><LmcSpinner /></div>
        }

        const { logsByResident, notes } = currentHandover

        if (!Object.keys(handoverHistory).length && !logsByResident.length && !notes.length) {
            return (
                <div style={styles.mainContainer}>
                    <div style={styles.content}>
                        <BlankState
                            heading='No handovers information found...'
                        />
                    </div>
                </div>
            )
        }
        return (
            <div style={styles.mainContainer}>
                <div style={styles.content}>
                    <LmcCurrentHandover
                        logsByResident={logsByResident}
                        notes={notes}
                    />
                    <LmcHandoversHistory
                        handovers={handoverHistory}
                    />
                </div>
            </div>
        )
    }
}

const styles = {
    mainContainer: {
        padding: '50px 20px 100px 20px',
        overflow: 'auto',
        height: '85vh'
    },
    content: {
        maxWidth: 1000,
        margin: '0 auto',
        wordWrap: 'break-word',
    }
}

LmcHandoversDashboard.propTypes = {
    currentHandover: PropTypes.object,
    fetchCurrentHandover: PropTypes.func.isRequired,
    handoverHistory: PropTypes.array
}

const mapStateToProps = (state) => {
    return {
        currentHandover: Selectors.formatCurrentHandover(state),
        handoverHistory: Selectors.formatHandoverHistory(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCurrentHandover: () => dispatch(ActionCreators.fetchCurrentHandover()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LmcHandoversDashboard)