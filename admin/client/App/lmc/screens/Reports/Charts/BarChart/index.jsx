import React, { Component } from 'react';
import PropTypes from 'prop-types';
const ReactHighcharts = require('react-highcharts');


class LmcBarChart extends Component {
    render() {
        const config = {
            /* HighchartsConfig */
        };
        const { title } = this.props;
        return (
            <div>
                <h2>
                    { title }
                </h2>
                <ReactHighcharts config = {config}></ReactHighcharts>
            </div>
        );
    }
}

LmcBarChart.propTypes = {
    title: PropTypes.string.isRequired,
};

export default LmcBarChart;
