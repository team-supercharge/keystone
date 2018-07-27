const ReactHighcharts = require('react-highcharts');
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { BlankState } from '../../../../../elemental';
import { LmcChartLogList } from '../../../../components';


class LmcFoodChart extends Component {

    render() {
        // Use categoryColor
        const {
            title,
            subTitle,
            yMax,
            yMin,
            xAxisLabel,
            yAxisLabel,
            logs,
        } = this.props;

        // TODO: merge Food and Fluids components
        // too much duplication
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

        const breakfast_logs = _.filter(logs, log => log.title.match(/breakfast/i) || log.description.match(/breakfast/i));
        const lunch_logs = _.filter(logs, log => log.title.match(/lunch/i) || log.description.match(/lunch/i));
        const dinner_logs = _.filter(logs, log => log.title.match(/dinner/i) || log.description.match(/dinner/i));

        let chartSeries = [];
        if (breakfast_logs && breakfast_logs.length) {
            chartSeries.push({
                name: 'Breakfast',
                color: breakfast_logs[0].categoryColor || colors[0],
                data: getSeriesData(breakfast_logs, 'meal'),
            });
        };

        if (lunch_logs && lunch_logs.length) {
            chartSeries.push({
                name: 'Lunch',
                color: colors[0],
                data: getSeriesData(lunch_logs, 'meal'),
            });
        };

        if (dinner_logs && dinner_logs.length) {
            chartSeries.push({
                name: 'Dinner',
                color: colors[1],
                data: getSeriesData(dinner_logs, 'meal'),
            });
        };

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
                    stacking: 'normal',
                },
            },
            legend: {
                enabled: true,
            },
            series: chartSeries,
        };
        console.log(chartSeries);
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

LmcFoodChart.propTypes = {
    title: PropTypes.string.isRequired,
};

export default LmcFoodChart;
