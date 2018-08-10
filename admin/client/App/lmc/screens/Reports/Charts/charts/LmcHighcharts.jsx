import React, { Component } from 'react';
import PropTypes from 'prop-types';
const ReactHighcharts = require('react-highcharts');
import moment from 'moment';


class LmcHighchart extends Component {
    render () {

        const {
            // title,
            subTitle,
            yMax,
            yMin,
            xAxisLabel,
            yAxisLabel,
            yCeiling,
            yAllowDecimals = true,
            chartType,
            series,
            tooltip,
            legendEnabled,
        } = this.props.config;

        const oneDay = 3600 * 1000 * 24;
        const config = {
            chart: {
                type: chartType || 'line',
                backgroundColor: 'none',
            },
            credits: {
                enabled: false,
            },
            title: {
                // style: {
                //     color: '#444',
                //     fontWeight: 'bold',
                // },
                text: '',
            },
            subtitle: {
                text: subTitle,
            },
            xAxis: {
                type: 'datetime',
                ceiling: Date.parse(moment().toString()),
                minPadding: 0.07,
                maxPadding: 0.07,
                // minTickInterval: 5 * oneDay,
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
                allowDecimals: yAllowDecimals,
                ceiling: yCeiling,
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
                    maxPointWidth: 50,
                    stacking: 'normal',
                    pointRange: oneDay,
                    pointPadding: 0.05,
                    // groupPadding: 0.2,
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
