import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router';

import {
    GlyphButton,
    Button,
    BlankState
} from '../../../../elemental';
import LmcLogFilter from '../../../components/LmcLogFilter.jsx';
import LmcPdfExport from '../../../components/LmcPdfExport.jsx';
import withMockData from './withMockData.jsx';

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
                showMock: false,
                logs: _.chain(props.dataFetch).get('value.results').sortBy('timeLogged').value(),
            };
            this.onFilterChange = this.onFilterChange.bind(this);
            this.renderToolbar = this.renderToolbar.bind(this);
        }

        onFilterChange (logs) {
            this.setState({
                logs: _.sortBy(logs, d => moment(d.timeLogged)),
            }); // ensure that they're sorted by date!
        }

        renderToolbar() {
            const { params, dataFetch } = this.props;
            const { logs } = this.state;
            const isEmpty = !logs || !logs.length;
            return (
                <div className="Toolbar">
                    <BackButton params={params} />
                    {dataFetch.fulfilled && !isEmpty
                        ? <LmcPdfExport logs={logs} resident={this.props.resident} {...config.pdfExport} />
                        : null}
                </div>
            );
        }

        render() {
            const { params, dataFetch, filterPadding } = this.props;
            const { logs, showMock } = this.state;

            const filterStyle = (_.get(config, 'dateFilter.left') === true)
                ? { paddingBottom: 25 }
                : { textAlign: 'center', paddingBottom: filterPadding || 25 };

            const isEmpty = !logs || !logs.length;
            const isDashboard = params.chart_type !== 'dashboard';

            let Child;
            if (dataFetch.fulfilled && !_.get(dataFetch, 'value.results.length')) {
                // button -> Report
                if (showMock) {
                    const Chart = withMockData(WrappedComponent, config);
                    return <Chart {...this.props} />;
                } else {
                    return (
                        <BlankState heading={'You haven\'t added any logs yet'} style={{ marginTop: 40 }} >
                            <Button onClick={() => this.setState({ showMock: true })}>
                                Show sample chart
                            </Button>
                        </BlankState>
                    )
                }
            }

            return (
                <div>
                    { isDashboard ? this.renderToolbar() : null }
                    { !isEmpty && <div style={filterStyle}>
                        <LmcLogFilter blockDatesWithNoData data={dataFetch.value.results} onChange={this.onFilterChange} />
                    </div> }
                    <WrappedComponent logs={logs} {...this.props} />
                </div>
            );
        }
    };
}