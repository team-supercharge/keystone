import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { BlankState } from '../../../../../elemental';
import { LmcChartLogList } from '../../../../components';
import withToolbar from '../withToolbar.jsx';


const icons = {
    left: {
        url: 'https://s3.eu-west-2.amazonaws.com/lmc-data-production/icons/left-arrow.png',
    },
    down: {
        url: 'https://s3.eu-west-2.amazonaws.com/lmc-data-production/icons/down-arrow.png',
    },
    right: {
        url: 'https://s3.eu-west-2.amazonaws.com/lmc-data-production/icons/right-arrow.png',
    },
};


class LmcTurnsChart extends Component {
    render () {
        const {
            // title, subTitle, yMax, yMin, xAxisLabel, yAxisLabel, type,
            logs,
        } = this.props;

        const Logs = _.cloneDeep(logs)
            .map(log => {

                if (log.description
                    && (log.description.match('to right')
                    || log.description.match('to his right')
                    || log.description.match('to her right'))
                ) {
                    log.itemIcon = icons.right;
                } else if (log.description
                    && (log.description.match('to left')
                    || log.description.match('to his left')
                    || log.description.match('to her left'))
                ) {
                    log.itemIcon = icons.left;
                } else if (log.description
                    && (log.description.match('to back')
                    || log.description.match('to his back')
                    || log.description.match('to her back'))
                ) {
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


export default withToolbar(LmcTurnsChart, {
    pdfExport: {
        title: 'Turns Chart',
    },
});
