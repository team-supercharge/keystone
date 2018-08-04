import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { BlankState } from '../../../../../elemental';
import { LmcChartLogList } from '../../../../components';
import LmcHighcharts from './LmcHighcharts.jsx';


class LmcLineChart extends Component {

    render () {
        // Use categoryColor
        const {
            mock,
            title,
            subTitle,
            yMax,
            yMin,
            xAxisLabel,
            yAxisLabel,
            series,
            legendEnabled,
            logs,
            type,
        } = this.props;

        const map_data = (data, key) => {
            return _(data)
                .map(log => [
                    Date.parse(moment(log.timeLogged).toString()),
                    parseFloat(_.get(log, `measurements.${key}.value`)),
                ])
                .filter(d => _.isNumber(d[1])) // triggers error for non numeric values
                .value();
        };

        const colors = [
            '#ab97c6',
            '#b4d78b',
        ];

        let chart_series;

        if (series && series.length) {
            chart_series = series.map(({ type, label }, index) => ({
                name: label,
                color: colors[index],
                data: map_data(logs, type),
                marker: {
                    lineColor: colors[index],
                },
            }));
        } else {
            chart_series = [{
                name: yAxisLabel,
                color: colors[0],
                data: map_data(logs, type),
            }];
        };

        const config = {
            title,
            subTitle,
            yMax,
            yMin,
            xAxisLabel,
            yAxisLabel,
            legendEnabled,
            chartType: 'line',
            series: chart_series,
        };


        return (
            logs && logs.length
                ? <div>
                    <LmcHighcharts config={config} />
                    <LmcChartLogList mock={mock} logs={logs} />
                </div>
                : <BlankState heading={`No logs to display`} style={{ marginTop: 40 }} />
        );
    }
}

LmcLineChart.propTypes = {
    title: PropTypes.string.isRequired,
};

export default LmcLineChart;
