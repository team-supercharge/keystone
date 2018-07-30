const ReactHighcharts = require('react-highcharts');
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { BlankState } from '../../../../../elemental';
import { LmcChartLogList } from '../../../../components';


class LmcFluidsChart extends Component {

    render() {
        const {
            title,
            subTitle,
            yMax,
            yMin,
            xAxisLabel,
            yAxisLabel,
            logs,
        } = this.props;
        // const chartData = _.map(logs, log => [Date.parse(moment(log.timeLogged).toString()), log.measurements[type].value]);

        const colors = ['#ab97c6', '#b4d78b'];
        const getSeriesData = (data, type) => {
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

        const fluds_in_logs = _.filter(logs, log => _.get(log, 'measurements.fluids_in.value'));
        const fluds_out_logs = _.filter(logs, log => _.get(log, 'measurements.fluids_out.value'));

        let chartSeries = [];
        if (fluds_in_logs && fluds_in_logs.length) {
            chartSeries.push({
                name: 'Fluids in',
                color: fluds_in_logs[0].categoryColor || colors[0],
                data: getSeriesData(fluds_in_logs, 'fluids_in'),
            });
        }

        if (fluds_out_logs && fluds_out_logs.length) {
            chartSeries.push({
                name: 'Fluids out',
                color: fluds_out_logs[0].categoryColor || colors[1],
                data: getSeriesData(fluds_out_logs, 'fluids_out'),
            });
        }

        const config = {
            chart: {
                type: 'column',
                backgroundColor: 'none',
            },
            credits: {
                enabled: false,
            },
            title: {
                style: {
                    color: '#444',
                    fontWeight: 'bold',
                },
                text: title,
            },
            subtitle: {
                text: subTitle,
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    format: '{value:%e %b}',
                },
                title: {
                    style: {
                        fontSize: '15px',
                        fontWeight: 'bold',
                    },
                    text: xAxisLabel || 'Date',
                }
            },
            yAxis: {
                max: yMax,
                min: yMin || 0,
                title: {
                    text: yAxisLabel,
                    style: {
                        fontSize: '15px',
                        fontWeight: 'bold',
                    },
                }
            },
            plotOptions: {
                column: {
                    maxPointWidth: 40,
                },
            },
            legend: {
                enabled: true,
            },
            series: chartSeries,
        };

        return (
            logs && logs.length
                ? <div>
                    {chartSeries.length ? <ReactHighcharts config={config} /> : null}
                    <LmcChartLogList logs={logs} />
                </div>
                : <BlankState heading={`No logs to display`} style={{ marginTop: 40 }} />
        );
    }
}

LmcFluidsChart.propTypes = {
    title: PropTypes.string.isRequired,
};

export default LmcFluidsChart;
