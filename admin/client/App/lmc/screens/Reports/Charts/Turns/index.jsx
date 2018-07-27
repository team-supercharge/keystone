const ReactHighcharts = require('react-highcharts');
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { BlankState } from '../../../../../elemental';
import { LmcChartLogList } from '../../../../components';


const icons = {
    left: {
        url: 'https://s3.eu-west-2.amazonaws.com/lmc-data-production/icons/left-arrow.png',
    },
    down: {
        url: 'https://s3.eu-west-2.amazonaws.com/lmc-data-production/icons/down-arrow.png',
    },
    right: {
        url: 'https://s3.eu-west-2.amazonaws.com/lmc-data-production/icons/right-arrow.png',
    }
};


class LmcTurnsChart extends Component {
    render() {
        const {
            // title, subTitle, yMax, yMin, xAxisLabel, yAxisLabel, type,
            logs,
        } = this.props;

        const Logs = _.cloneDeep(logs)
            .map(log => {

                if (log.description && log.description.match('to right')) {
                    log.itemIcon = icons.right;
                } else if (log.description && log.description.match('to left')) {
                    log.itemIcon = icons.left;
                } else if (log.description && (log.description.match('her back') || log.description.match('his back'))) {
                    log.itemIcon = icons.down;
                }

                return log;
            }); // because we're mutating them!


        // const chartData = _.map(logs, log => [Date.parse(moment(log.timeLogged).toString()), log.measurements[type].value]);
        return (
            Logs && Logs.length
                ? <div>
                    {/* <ReactHighcharts config={config} /> */}
                    <LmcChartLogList logs={Logs} />
                </div>
                : <BlankState heading={`No logs to display`} style={{ marginTop: 40 }} />
        );
    }
}

LmcTurnsChart.propTypes = {
    title: PropTypes.string.isRequired,
};

export default LmcTurnsChart;
