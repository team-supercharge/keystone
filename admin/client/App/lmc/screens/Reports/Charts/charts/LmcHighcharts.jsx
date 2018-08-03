import React, { Component } from 'react';
import PropTypes from 'prop-types';
const ReactHighcharts = require('react-highcharts');
import moment from 'moment';


class LmcHighchart extends Component {
    render () {

        const {
            title,
            subTitle,
            yMax,
            yMin,
            xAxisLabel,
            yAxisLabel,
            chartType,
            series,
            tooltip,
            legendEnabled,
        } = this.props.config;

        const config = {
            chart: {
                type: chartType || 'line',
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
                ceiling: Date.parse(moment().toString()),
                minPadding: 0.1,
                maxPadding: 0.1,
                minTickInterval: 3600 * 1000 * 24,
                labels: {
                    format: '{value:%e %b}',
                },
                title: {
                    style: {
                        fontSize: '15px',
                        fontWeight: 'bold',
                    },
                    text: xAxisLabel || 'Date',
                },
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
                },
            },
            plotOptions: {
                column: {
                    maxPointWidth: 40,
                    stacking: 'normal',
                },
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
                    },
                },
            },
            legend: {
                enabled: legendEnabled || false,
            },
            series,
        };

        if (tooltip) {
            config.tooltip = tooltip; // bug fix...
        }

        return <ReactHighcharts config={config} />;
    }
}

LmcHighchart.propTypes = {
    config: PropTypes.object.isRequired,
};

export default LmcHighchart;
