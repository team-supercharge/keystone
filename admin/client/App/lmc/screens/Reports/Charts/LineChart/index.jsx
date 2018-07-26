const ReactHighcharts = require('react-highcharts');
import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { BlankState, GlyphButton } from '../../../../../elemental';
import { LmcChartLogList } from '../../../../components';


class LmcLineChart extends Component {

    render() {
        // Use categoryColor
        const { title, subTitle, yMax, yMin, xAxisLabel, yAxisLabel, type, series, logs, legendEnabled } = this.props;


        const map_data = (data, key) => {
            return data.map(log => [
                    Date.parse(moment(log.timeLogged).toString()),
                    _.get(log, `measurements.${key}.value`),
            ]);
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
                }
            }));
        } else {
            chart_series = [{
                name: yAxisLabel,
                color: colors[0],
                data: map_data(logs, type),
            }];
        };

        const config = {
            chart: {
                type: 'line',
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
                // tickInterval: 3600 * 1000 * 24 * 7,
                // maxTickInterval: moment.duration(1, 'day').asMilliseconds(),
                minRange: 3600000 * 24 * 5,
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
                line: {
                    lineWidth: 4,
                    animation: {
                        duration: 1300,
                    },
                    marker: {
                        radius: 4,
                        enabled: true,
                        lineWidth: 3,
                        fillColor: '#f9f9f9',
                        lineColor: '#ab97c6',
                    }
                }
            },
            legend: {
                enabled: legendEnabled || false,
            },
            series: chart_series,
        };

        return (
            logs && logs.length
                ? <div>
                    <ReactHighcharts config={config} />
                    <LmcChartLogList logs={logs} />
                </div>
                : <BlankState heading={`No logs to display`} style={{ marginTop: 40 }} />
        );
    }
}

LmcLineChart.propTypes = {
    title: PropTypes.string.isRequired,
};

export default LmcLineChart;
