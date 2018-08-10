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
            .filter(log => _.get(log, 'measurements.stool.value') > -1)
            .groupBy('measurements.stool.value')
            .map((logs, group) => {
                return {
                    name: parseInt(group) === 0 ? 'Other' : `Type ${group}`,
                    color: parseInt(group) === 0 ? '#c5c5c5' : StoolColormap[group],
                    data: this.formatLogs(logs),
                };
            })
            .value();
    }

    render () {
        const { resident, logs } = this.props;
        const series = this.formatSeries(logs);
        const config = {
            title: 'Stool Chart',
            subTitle: 'Bristol Stool Scale',
            yAxisLabel: 'Number of bowel movements',
            legendEnabled: true,
            chartType: 'column',
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
});
