import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { BlankState } from '../../../../../elemental';
import { LmcChartLogList } from '../../../../components';
import withToolbar from '../withToolbar.jsx';
import LmcHighcharts from './LmcHighcharts.jsx';
// const ReactHighcharts = require('react-highcharts');
// require('highcharts/modules/pattern-fill')(ReactHighcharts.Highcharts);

class LmcFoodChart extends Component {

    getSeriesData (data, type) {
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

    render () {
        const { logs } = this.props;
        const colors = ['#D1D3D4', '#ffdbea', '#E55AA1'];
// c64d84
        let allLogs = [];
        let series = [];
        let groups = [
            {
                name: 'Snack',
                color: colors[2],
                // color: 'url(#highcharts-default-pattern-0)',
            },
            {
                name: 'Breakfast',
                // color: 'url(#highcharts-default-pattern-0)',
            },
            {
                name: 'Lunch',
                color: colors[0],
                // color: 'url(#highcharts-default-pattern-1)',
            },
            {
                name: 'Dinner',
                color: colors[1],
                // color: 'url(#highcharts-default-pattern-2)',
            },
            
        ];

        groups.forEach(({ name, color }) => {
            let pattern = new RegExp(name, 'i');
            const logGroup = _.filter(logs, log => log.title.match(pattern));
            allLogs = [...allLogs, ...logGroup];

            if (logGroup && logGroup.length) {
                series.push({
                    name,
                    color: color || logGroup[0].categoryColor,
                    data: this.getSeriesData(logGroup, 'meal'),
                });
            };
        });

        const config = {
            title: 'Food Chart',
            yAxisLabel: 'Portions Consumed',
            yMax: 6,
            legendEnabled: true,
            chartType: 'column',
            series,
        };

        return (
            logs && logs.length
                ? <div>
                    <LmcHighcharts config={config} />
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
        title: 'Food Chart',
    },
});
