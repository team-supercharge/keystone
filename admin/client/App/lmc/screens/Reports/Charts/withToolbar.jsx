import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router';

import { GlyphButton } from '../../../../elemental';
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
export default function withToolbar(WrappedComponent, config) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                logs: _.chain(props.dataFetch).get('value.results').sortBy('timeLogged').value(),
            };
            this.onFilterChange = this.onFilterChange.bind(this);
        }

        onFilterChange (logs) {
            this.setState({
                logs: _.sortBy(logs, d => moment(d.timeLogged)),
            }); // ensure that they're sorted by date!
        }

        render() {
            const { params, dataFetch, filterPadding } = this.props;
            const { logs } = this.state;
            const isEmpty = !logs || !logs.length;
            const filterStyle = (_.get(config, 'dateFilter.left') === true)
                ? { paddingBottom: 25 }
                : { textAlign: 'center', paddingBottom: filterPadding || 25 };

            return (
                <div>
                    { params.chart_type !== 'dashboard'
                        ? <div className="Toolbar">
                        <BackButton params={params} />
                        {dataFetch.fulfilled && !isEmpty
                            ? <LmcPdfExport logs={logs} resident={this.props.resident} {...config.pdfExport} />
                            : null}
                    </div> : null }
                    {!isEmpty && <div style={filterStyle}>
                        <LmcLogFilter data={dataFetch.value.results} onChange={this.onFilterChange} />
                    </div>}
                    <WrappedComponent logs={logs} {...this.props} />
                </div>
            );
        }
    };
}