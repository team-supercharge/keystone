import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { BlankState } from '../../../../../elemental';
import { LmcChartLogList } from '../../../../components';
import withToolbar from '../withToolbar.jsx';
import LmcHighcharts from './LmcHighcharts.jsx';


class LmcFluidsChart extends Component {

    getSeriesData (data, type) {
        return _.chain(data)
            .groupBy(log => moment(log.timeLogged).startOf('day').add(1, 'h').format())
            .map((value, date) => {

                const total = _.chain(value)
                    .map(`measurements.${type}.value`)
                    .filter(_.isNumber) // triggers error for non numeric values
                    .sum()
                    .value();

                return [Date.parse(moment(date).toString()), total]; // { x: date, y: total };
            })
            .value();
    };

    render () {
        const { logs } = this.props;
        const colors = ['#ab97c6', '#b4d78b'];

        const fluds_in_logs = _.filter(logs, log => _.get(log, 'measurements.fluids_in.value'));
        const fluds_out_logs = _.filter(logs, log => _.get(log, 'measurements.fluids_out.value'));

        let series = [];
        if (fluds_in_logs && fluds_in_logs.length) {
            series.push({
                name: 'Fluids in',
                stack: 'fluids_in',
                color: fluds_in_logs[0].categoryColor || colors[0],
                data: this.getSeriesData(fluds_in_logs, 'fluids_in'),
            });
        }

        if (fluds_out_logs && fluds_out_logs.length) {
            series.push({
                name: 'Fluids out',
                stack: 'fluids_out',
                color: fluds_out_logs[0].categoryColor || colors[1],
                data: this.getSeriesData(fluds_out_logs, 'fluids_out'),
            });
        }

        const config = {
            title: 'Fluids Chart',
            yAxisLabel: 'Fluids In / Out (ml)',
            legendEnabled: true,
            chartType: 'column',
            series,
        };

        return (
            logs && logs.length
                ? <div>
                    {series.length ? <LmcHighcharts config={config} /> : null}
                    <LmcChartLogList logs={logs} />
                </div>
                : <BlankState heading={`No logs to display`} style={{ marginTop: 40 }} />
        );
    }
}

LmcFluidsChart.propTypes = {
    title: PropTypes.string.isRequired,
};

export default withToolbar(LmcFluidsChart, {
    pdfExport: {
        title: 'Fluids Chart',
    },
});
