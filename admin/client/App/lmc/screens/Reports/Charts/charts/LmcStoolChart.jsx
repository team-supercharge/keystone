import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { BlankState } from '../../../../../elemental';
import LmcStoolTable from './LmcStoolTable.jsx';
import { StoolColormap } from '../../../../common/utils';
import withToolbar from '../withToolbar.jsx';
import LmcHighcharts from './LmcHighcharts.jsx';


class LmcStoolChart extends Component {

    constructor (props) {
        super(props);
        this.formatSeries = this.formatSeries.bind(this);
    }

    formatLogs (logs) {
        return _.chain(logs)
            .groupBy(log => moment(log.timeLogged).startOf('day').add(1, 'h').format())
            .map((value, date) => {
                return [Date.parse(moment(date).toString()), value.length]; // { x: date, y: total };
            })
            .value();
    }

    formatSeries (logs) {
        return _.chain(logs)
            .map(log => {
                const value = _.get(log, 'measurements.stool.value');
                return {
                    value: value > 0 ? value : 'Other',
                    timeLogged: log.timeLogged,
                }
            })
            .groupBy('value')
            .map((rows, group) => ({
                group,
                data: this.formatLogs(rows),
            }))
            .keyBy('group')
            .value();
    }

    render () {
        const { resident, logs } = this.props;
        const groups = this.formatSeries(logs);
        let series = [];
        [ 1, 2, 3, 4, 5, 6, 7, 'Other' ]
            .forEach(group => {
                series.push({
                    name: group > 0 ? `Type ${group}` : 'Other',
                    color: StoolColormap[group] || '#c5c5c5',
                    data: groups[group] ? groups[group].data : null,
                });
            });
        
        const config = {
            title: 'Stool Chart',
            subTitle: 'Bristol Stool Scale',
            yAxisLabel: 'Number of bowel movements',
            legendEnabled: true,
            chartType: 'column',
            yAllowDecimals: false,
            tooltip: {
                formatter: function () {
                    return `<strong style="font-size: 10px; opacity: 0.7;">${moment(this.x).format('dddd Do MMMM YYYY')}</strong><br /><b>${this.y}</b> bowel movement${this.y > 1 ? 's' : ''} of <b>${this.series.name}</b>`;
                },
            },
            series,
        };

        return (
            logs && logs.length
                ? <div>
                    <LmcHighcharts config={config} />
                    <LmcStoolTable logs={logs} resident={resident} />
                </div>
                : <BlankState heading={`No logs to display`} style={{ marginTop: 40 }} />
        );
    }
}

LmcStoolChart.propTypes = {
    title: PropTypes.string.isRequired,
};

export default withToolbar(LmcStoolChart, {
    pdfExport: {
        title: 'Stool Chart',
    },
    timeWindow: 7 * 4,
});
