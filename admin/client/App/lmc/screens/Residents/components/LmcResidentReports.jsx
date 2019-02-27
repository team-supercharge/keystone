import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { ActionCreators } from '../../../actions/actions'
import LmcDataSource from './LmcDataSource.jsx'
import LmcLogTimeline from '../../../components/LmcLogTimeline.jsx'
import LmcPdfExport from '../../../components/LmcPdfExport.jsx'
import LmcDateRangePicker from '../../../components/LmcDateRangePicker.jsx'
import Selectors from '../../../selectors'
import moment from 'moment'

export class LmcResidentReports extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: moment().subtract(10, 'days'),
            endDate: moment(),
        }
        this.renderSuccess = this.renderSuccess.bind(this);
        this.setDateRange = this.setDateRange.bind(this);
    }

    setDateRange ({ startDate, endDate }) {
        this.setState({
            endDate: endDate ? moment(endDate).endOf('day') : null,
            startDate: startDate ? moment(startDate).startOf('day') : null,
        });
    }

    renderSuccess(logs) {
        const { residentProfile } = this.props
        if (!logs || !logs.length) return null;
        return (
            <div>
                <LmcPdfExport
                    logs={logs}
                    resident={residentProfile}
                    title='Daily Report'
                    headerDate={true}
                    groupBy='date'
                    dateFormat='HH:MM'
                />
                <LmcLogTimeline logs={logs} />
            </div>
        )
    }

    getQuery() {
        const {
            startDate,
            endDate
        } = this.state;
        let query = {};
        if (endDate) query.to = endDate.toISOString()
        if (startDate) query.from = startDate.toISOString()
        return query
    }

    render() {
        const { selectedResident } = this.props
        if (!selectedResident) return null
        const {
            startDate,
            endDate
        } = this.state;
        let query = this.getQuery();

        return (
            <div>
                <LmcDateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    maximumNights={28}
                    blockFuture
                    onChange={this.setDateRange}
                />
                <div style={{ marginTop: 10 }}>
                    <LmcDataSource
                        query={query}
                        emptyMessage='No logs to display'
                        url={`${Keystone.adminPath}/api/reports/residents/${selectedResident}/logs`}
                        renderSuccess={this.renderSuccess}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedResident: state.residents.selectedResident,
        residentProfile: Selectors.getSelectedResidentProfile(state)
    }
}

export default connect(mapStateToProps)(LmcResidentReports)