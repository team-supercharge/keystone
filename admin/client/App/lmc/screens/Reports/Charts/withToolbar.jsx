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
        to={`${Keystone.adminPath}/reports/charts/dashboard/${params.resident_id}`}
        variant="link">
        Dashboard
    </GlyphButton>);
};

// Simple HOC that wraps each chart in toolbar, filter and export features
export default function withToolbar (WrappedComponent, config) {
    return class extends Component {
        constructor (props) {
            super(props);
            this.state = {
                showMock: false,
                logs: _.sortBy(props.data, 'timeLogged'),
            };
            this.onFilterChange = this.onFilterChange.bind(this);
            this.renderToolbar = this.renderToolbar.bind(this);
        }

        onFilterChange (logs) {
            this.setState({
                logs: _.sortBy(logs, d => moment(d.timeLogged)),
            }); // ensure that they're sorted by date!
        }

        renderToolbar () {
            const { params, data } = this.props;
            const { logs } = this.state;
            const isEmpty = !logs || !logs.length;
            return (
                <div className="Toolbar">
                    <BackButton params={params} />
                    {data && !isEmpty
                        ? <LmcPdfExport logs={logs} resident={this.props.resident} {...config.pdfExport} />
                        : null}
                </div>
            );
        }

        render () {
            const { params, data, filterPadding } = this.props;
            const { logs } = this.state;

            const filterStyle = (_.get(config, 'dateFilter.left') === true)
                ? { paddingBottom: 25 }
                : { textAlign: 'center', paddingBottom: filterPadding || 25 };

            const isEmpty = !logs || !logs.length;
            const isDashboard = params.chart_type !== 'dashboard';

            return (
                <div>
                    { isDashboard ? this.renderToolbar() : null }
                    { !isEmpty && <div style={filterStyle}>
                        <LmcLogFilter blockDatesWithNoData data={data} onChange={this.onFilterChange} />
                    </div> }
                    <WrappedComponent logs={logs} {...this.props} {...config.childProps} />
                </div>
            );
        }
    };
};
