import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
const ReactHighcharts = require('react-highcharts');
import moment from 'moment';

class LmcColumnChart extends Component {
    render() {
        // Use categoryColor
        const { title, subTitle, xAxisLabel, yAxisLabel, dataFetch: { value: data } } = this.props;
        // TODO: avoid duplicate data? Select latest only
        const logs = _.sortBy(data.results, 'timeLogged');
        const chartData = _.map(logs, log => [Date.parse(moment(log.timeLogged).toString()), log.measurements.must.value]);

        const config = {
            chart: {
                type: 'column',
                backgroundColor: 'none',
            },
            title: {
                text: title,
            },
            subtitle: {
                text: subTitle,
            },
            xAxis: {
                type: 'datetime',
                tickInterval: 3600 * 1000 * 24 * 7,
                // maxTickInterval: moment.duration(1, 'day').asMilliseconds(),
                minRange: 3600000 * 24 * 5,
                labels: {
                    format: '{value:%e %b}',
                },
                title: {
                    text: 'Date',
                }
            },
            yAxis: {
                max: 5,
                title: {
                    text: 'MUST Score',
                }
            },
            plotOptions: {
                column: {
                    maxPointWidth: 20,
                }
            },
            legend: {
                enabled: false,
            },
            series: [{
                name: 'MUST Score',
                color: '#ab97c6',
                data: chartData,
            }]
        };
        
        return (
            <div>
                <ReactHighcharts config={config}></ReactHighcharts>
            </div>
        );
    }
}

LmcColumnChart.propTypes = {
    title: PropTypes.string.isRequired,
};

export default LmcColumnChart;
