const ReactHighcharts = require('react-highcharts');
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { BlankState } from '../../../../../elemental';
import { LmcChartLogList } from '../../../../components';
import withToolbar from '../withToolbar.jsx';

// require('highcharts/modules/pattern-fill')(ReactHighcharts.Highcharts);

class LmcFoodChart extends Component {

    render () {
        // Use categoryColor
        const {
            subTitle, // remove
            xAxisLabel, // remove
            yMin, // remove
            logs,
        } = this.props;

        const yMax = 6;
        const yAxisLabel = 'Portions Consumed';
        const title = 'Food Chart';

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

        let allLogs = [];
        let chartSeries = [];
        let groups = [
            {
                name: 'Breakfast',
                // color: 'url(#highcharts-default-pattern-0)',
            },
            {
                name: 'Lunch',
                color: colors[0],
                // color: 'url(#highcharts-default-pattern-2)',
            },
            {
                name: 'Dinner',
                color: colors[1],
                // color: 'url(#highcharts-default-pattern-4)',
            },
        ];

        groups.forEach(({ name, color }) => {
            let pattern = new RegExp(name, 'i');
            const logGroup = _.chain(logs)
                .filter(log => log.title.match(pattern))
                .cloneDeep()
                // .map(log => {
                //     // so that the item colors in the log list match the chart
                //     if (color) log.categoryColor = color;
                //     return log;
                // })
                .value();

            allLogs = [...allLogs, ...logGroup];

            if (logGroup && logGroup.length) {
                chartSeries.push({
                    name,
                    color: color || logGroup[0].categoryColor,
                    data: getSeriesData(logGroup, 'meal'),
                });
            };
        });


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
                minTickInterval: 3600 * 1000 * 24,
                ceiling: Date.parse(moment().toString()),
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
                symbolRadius: 20,
            },
            series: chartSeries,
        };

        return (
            logs && logs.length
                ? <div>
                    <ReactHighcharts config={config} />
                    <LmcChartLogList logs={allLogs} />
                </div>
                : <BlankState heading={`No logs to display`} style={{ marginTop: 40 }} />
        );
    }
}

LmcFoodChart.propTypes = {
    title: PropTypes.string.isRequired,
};


export default withToolbar(LmcFoodChart, {
    pdfExport: {
        title: 'Food Consumed',
    },
});
