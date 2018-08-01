import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-refetch';
import _ from 'lodash';
import LmcLoadingScreen from '../../../../components/LmcLoadingScreen.jsx';
import { BlankState } from '../../../../../elemental';
import moment from 'moment';
import { Link } from 'react-router';

const startOfDay = (d) => {
    return moment(d).startOf('day');
}

class LmcFluidsTable extends Component {

    constructor(props) {
        super(props);
        this.renderTable = this.renderTable.bind(this);
    }

    formatLogs(logs) {

        /*
        returns:
        [
            residentName: '',
            residentId: '',
            data: [
                {
                    date: '2018-07-27T01:00:00+01:00',
                    fluids_in: 0,
                    fluids_out: 0,
                }
            ]
        ]
        */

        return _.chain(logs)
            .filter(log => _.get(log, 'measurements.fluids_in.value') > 0 || _.get(log, 'measurements.fluids_out.value') > 0)
            .groupBy('residentName')
            .map((logs, residentName) => {
                return {
                    residentName,
                    residentId: logs[0].residentId,
                    data: _.chain(logs)
                        .groupBy(log => startOfDay(log.timeLogged).format())
                        .map((group, date) => {
                            return {
                                date,
                                fluids_in: _.sumBy(group, 'measurements.fluids_in.value') || 0,
                                fluids_out: _.sumBy(group, 'measurements.fluids_out.value') || 0,
                            };
                        })
                        .value(),
                }
            })
            .sortBy('residentName')
            .value();
    }

    renderHeader(to, from) {
        const diff = to.diff(from, 'days') + 1;
        const days = _.range(0, diff).map(d => moment(from).add(d, 'day'));
        const months = _.chain(days)
            .map(d => moment(d).startOf('month').format())
            .countBy()
            .map((count, date) => {
                return { date: moment(date), count };
            })
            // .sortBy(d => -d.date)
            .value();

        return (
            <thead className="lmc-table-center-text">
                <tr>
                    <th style={styles.nameTh}></th>
                    { months.map(month => {
                        return (
                            <th colSpan={month.count} style={styles.monthRow}>
                                { month.date.format(MONTH_FORMAT)}
                            </th>
                        )
                    })}
                </tr>
                <tr>
                    <th></th>
                    {days.map(d => (
                        <th key={d.format()}>
                            { d.format(DATE_FORMAT) }
                        </th>
                    ))}
                </tr>
            </thead>
        )
    }

    renderRow(to, from, row) {
        const diff = to.diff(from, 'days') + 1;
        const days = _.range(0, diff);
        const fluids = _.keyBy(row.data, 'date');
        return (
            <tr className="lmc-table-center-text">
                <td>
                    <Link to={`${Keystone.adminPath}/reports/charts/fluids/${row.residentId}`}>
                        {row.residentName}
                    </Link>
                </td>
                {days.map(d => {
                    const _date = startOfDay(from).add(d, 'd').format();
                    const fluids_in = _.get(fluids, `${_date}.fluids_in`);
                    return (
                        <td key={d}>
                            { fluids_in || <span style={{ opacity: 0.2 }}>0</span> }
                        </td>
                    )    
                })}
            </tr>
        )
    }

    renderTable() {
        const { dataFetch, to, from } = this.props;
        const rows = this.formatLogs(dataFetch.value.results);
        return (
            <table className="Table ItemList">
                { this.renderHeader(to, from) }
                { rows.map(row => this.renderRow(to, from, row)) }
            </table>
        )
    }

    render() {
        const { dataFetch } = this.props;
        if (dataFetch.pending) {
            return <LmcLoadingScreen />;
        }
        if (!dataFetch.fulfilled) {
            return <BlankState heading={'Oops! Unable to load the chart'} style={styles.blankSlate} />;
        }
        if (dataFetch.fulfilled && !dataFetch.value.results.length) {
            return <BlankState heading={'No logs to display'} style={styles.blankSlate} />;
        }
        return this.renderTable();
    }
}

LmcFluidsTable.propTypes = {
    to: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
};

const DATE_FORMAT = 'ddd Do';
const MONTH_FORMAT = 'MMM';

const styles = {
    nameTh: {
        width: 120,
        border: 'none',
    },
    blackSlate: {
        margin: 40,
    },
    monthRow: {
        padding: 5,
        paddingBottom: 0,
        fontWeight: 'bold',
        borderBottom: 'none',
        borderTop: '2px solid #e4e4e4',
        borderRight: '2px solid #e4e4e4',
        borderLeft: '2px solid #e4e4e4',
    }
}

export default connect(({ to, from }) => {
    let url = `${Keystone.adminPath}/api/reports/charts/fluids_in`;
    // possible to just pass a params object?
    if (from && to) {
        url += `?to=${to.toISOString()}&from=${from.toISOString()}`;
    } else if (to) {
        url += `?to=${to.toISOString()}`;
    } else  if (from) {
        url += `?from=${from.toISOString()}`;
    };
    return { dataFetch: url };
})(LmcFluidsTable);
