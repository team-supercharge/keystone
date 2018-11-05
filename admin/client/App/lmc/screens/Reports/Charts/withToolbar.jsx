import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router';

import {
    GlyphButton,
} from '../../../../elemental';
import LmcLogFilter from '../../../components/LmcLogFilter.jsx';
import LmcPdfExport from '../../../components/LmcPdfExport.jsx';


const BackButton = ({ params }) => {
    return (<GlyphButton
        component={Link}
        glyph="chevron-left"
        position="left"
        style={{ float: 'left' }}
        to={`${Keystone.adminPath}/reports/charts/dashboard/${params.resident_id}`}
        variant="link">
        Dashboard
    </GlyphButton>);
};

// Simple HOC that wraps each chart in toolbar, filter and export features
export default function withToolbar (WrappedComponent, config = {}) {
    return class extends Component {
        constructor (props) {
            super(props);
            const { to, from } = this.getDefaultDates(config.timeWindow || 1);
            const logs = this.getLogs(props.data, from);
            let state = { showMock: false };
            // if the filter doesn't return a large enough dataset (len 3), show the whole window
            if (props.data && (logs.length < props.data.length) && (logs.length > 1)) {
                state.to = to;
                state.from = from;
                state.logs = logs;
            } else {
                state.logs = props.data;
            }

            this.state = state;
            this.setDates = this.setDates.bind(this);
            this.onFilterChange = this.onFilterChange.bind(this);
            this.renderToolbar = this.renderToolbar.bind(this);
        }

        onFilterChange (logs) {
            this.setState({
                logs: _.sortBy(logs, d => moment(d.timeLogged)),
            }); // ensure that they're sorted by date!
        }

        getLogs (logs, from) {
            // to avoid rendering data that's outside the default date range
            // maybe put into a utils method?
            return _.chain(logs)
                .sortBy('timeLogged')
                .filter((log) => from.startOf('day').diff(moment(log.timeLogged).startOf('day')) <= 0)
                .value();
        }

        getDefaultDates (timeWindow) {
            return {
                to: moment(),
                from: moment().subtract(timeWindow, 'days').startOf('day'),
            };
        }

        renderToolbar () {
            const { params, data, resident } = this.props;
            const { logs } = this.state;
            const hasData = data && logs && logs.length;
            return (
                <div className="Toolbar" style={{ textAlign: 'center' }}>
                    <BackButton params={params} />
                    { resident && resident.name
                        ? <span style={{ fontSize: 24, fontWeight: 300 }}>
                            { resident.name } - { config.pdfExport.title }
                        </span>
                        : null }
                    { hasData
                        ? <LmcPdfExport logs={logs} resident={this.props.resident} {...config.pdfExport} />
                        : <span style={{ paddingLeft: 130 }} /> }
                </div>
            );
        }

        setDates ({ startDate, endDate }) {
            this.setState({
                to: endDate ? moment(endDate).endOf('day') : null,
                from: startDate ? moment(startDate).startOf('day') : null,
            });
        }

        render () {
            const { params, data, filterPadding } = this.props;
            const { logs, to, from } = this.state;

            const filterStyle = (_.get(config, 'dateFilter.left') === true)
                ? { paddingBottom: 25 }
                : { textAlign: 'center', paddingBottom: filterPadding || 25, paddingRight: 13 };

            const isEmpty = !logs || !logs.length;
            const isDashboard = params && params.chart_type !== 'dashboard';

            return (
                <div>
                    { isDashboard ? this.renderToolbar() : null }
                    { !isEmpty && <div style={filterStyle}>
                        <LmcLogFilter
                            to={to}
                            from={from}
                            blockFuture
                            blockDatesWithNoData
                            data={data}
                            onChange={this.onFilterChange}
                            onNewDates={this.setDates}
                        />
                    </div> }
                    <div style={{ marginRight: 15 }}>
                        <WrappedComponent
                            to={to}
                            from={from}
                            logs={logs}
                            {...this.props}
                            {...config.childProps}
                        />
                    </div>
                </div>
            );
        }
    };
};
