const ReactHighcharts = require('react-highcharts');
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { BlankState } from '../../../../../elemental';
import LmcStoolTable from './LmcStoolTable.jsx';
import { StoolColormap } from '../../../../common/utils';
import withToolbar from '../withToolbar.jsx';


class LmcStoolChart extends Component {
    render () {
        // Use categoryColor
        const {
            yMax,
            yMin,
            xAxisLabel,
            resident,
            logs,
        } = this.props;


        const yAxisLabel = 'Number of bowel movements';
        const title = 'Stool Chart';
        const subTitle = 'Bristol Stool Scale';

        // http://colorbrewer2.org/#type=diverging&scheme=RdYlBu&n=7

        const chartSeries = _.chain(logs)
            .filter(log => _.get(log, 'measurements.stool.value') > -1)
            .groupBy('measurements.stool.value')
            .map((logs, group) => {
                return {
                    name: parseInt(group) === 0 ? 'Other' : `Type ${group}`,
                    color: parseInt(group) === 0 ? '#c5c5c5' : StoolColormap[group],
                    data: _.chain(logs)
                            .groupBy(log => moment(log.timeLogged).startOf('day').add(1, 'h').format())
                            .map((value, date) => {
                                return [Date.parse(moment(date).toString()), value.length]; // { x: date, y: total };
                            })
                            .value(),
                };
            })
            .value();

        const config = {
            chart: {
                type: 'column',
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
            tooltip: {
                formatter: function () {
                    return `<b>${this.y}</b> bowel movement${this.y > 1 ? 's' : ''} of <b>${this.series.name}</b>`;
                },
            },
            xAxis: {
                ceiling: Date.parse(moment().toString()),
                minPadding: 0.1,
                maxPadding: 0.1,
                minTickInterval: 3600 * 1000 * 24,
                type: 'datetime',
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
                minRange: 3,
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
            },
            legend: {
                enabled: true,
            },
            series: chartSeries,
        };

        return (
            logs && logs.length
                ? <div>
                    <ReactHighcharts config={config} />
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
