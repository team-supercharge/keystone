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
            // title, subTitle, yMax, yMin, xAxisLabel, yAxisLabel, type, 
            logs,
        } = this.props;
        // const chartData = _.map(logs, log => [Date.parse(moment(log.timeLogged).toString()), log.measurements[type].value]);
        return (
            logs && logs.length
                ? <div>
                    {/* <ReactHighcharts config={config} /> */}
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
