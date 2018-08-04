import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withDataLoader from '../withDataLoader.jsx';
import _ from 'lodash';
import moment from 'moment';
import { browserHistory } from 'react-router';
import { BlankState } from '../../../../../elemental';
import { LmcLink } from '../../../../components';

const startOfDay = (d) => {
    return moment(d).startOf('day');
};

class LmcDailyTotalTable extends Component {

    constructor (props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
    }

    formatLogs (logs, type) {

        /*
        returns:
        [
            residentName: '',
            residentId: '',
            data: [
                {
                    date: '2018-07-27T01:00:00+01:00',
                    value: DailyTotal(),
                }
            ]
        ]
        */

        return _.chain(logs)
            .filter(log => _.get(log, `measurements.${type}.value`) > 0)
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
                                value: _.sumBy(group, `measurements.${type}.value`) || 0,
                            };
                        })
                        .value(),
                };
            })
            .sortBy('residentName')
            .value();
    }

    handleClick (link, residentId) {
        browserHistory.push(`/admin/reports/charts/${link}/${residentId}`);
    }

    renderHeader (to, from) {
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

        const getBorderStyle = (d, i) => {
            if (i === (days.length - 1)) {
                return { borderRight: '2px solid #e4e4e4' };
            }
            if (i === 0 || d.format('DD') === '01') {
                return { borderLeft: '2px solid #e4e4e4' };
            };
        };

        return (
            <thead className="lmc-table-center-text">
                <tr>
                    <th style={styles.nameTh} />
                    { months.map(month => (
                        <th key={month.date.format()} colSpan={month.count} style={styles.monthRow}>
                            { month.date.format(MONTH_FORMAT)}
                        </th>
                    ))}
                </tr>
                <tr>
                    <th />
                    {days.map((d, i) => (
                        <th style={getBorderStyle(d, i)} key={d.format()}>
                            { d.format(DATE_FORMAT) }
                        </th>
                    ))}
                </tr>
            </thead>
        );
    }

    renderRow (row) {
        const { to, from, link, mock } = this.props;
        const diff = to.diff(from, 'days') + 1;
        const days = _.range(0, diff);
        const data = _.keyBy(row.data, 'date');
        let wrapperClass = 'lmc-table-center-text';
        if (!mock) wrapperClass += ' lmc-table-row__selectable';
        return (
            <tr className={wrapperClass}>
                <td style={{ borderRight: '2px solid #e4e4e4' }}>
                    <LmcLink disabled={mock} style={{ color: 'black' }} to={`${Keystone.adminPath}/residents/${row.residentId}`}>
                        {row.residentName}
                    </LmcLink>
                </td>
                {days.map(d => {
                    const _date = startOfDay(from).add(d, 'd').format();
                    const value = _.get(data, `${_date}.value`);
                    return (
                        <td onClick={(e) => !mock && this.handleClick(link, row.residentId)} key={d} className="lmc-table-td__selectable">
                            { value || <span style={{ opacity: 0.2 }}>0</span> }
                        </td>
                    );
                })}
            </tr>
        );
    }

    render () {
        const { data, to, from, type } = this.props;
        const rows = this.formatLogs(data, type);
        if (!rows || !rows.length) {
            return <BlankState heading={'No logs to show'} style={styles.blankSlate} />;
        }
        return (
            <table className="Table ItemList">
                { this.renderHeader(to, from) }
                { rows.map(this.renderRow) }
            </table>
        );
    }
}

LmcDailyTotalTable.propTypes = {
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

const DATE_FORMAT = 'Do';
const MONTH_FORMAT = 'MMMM';

const styles = {
    nameTh: {
        width: 120,
        border: 'none',
    },
    blackSlate: {
        margin: 40,
    },
    monthRow: {
        padding: '10px 5px 2px 5px',
        fontWeight: 'bold',
        borderBottom: 'none',
        borderTop: '2px solid #e4e4e4',
        borderRight: '2px solid #e4e4e4',
        borderLeft: '2px solid #e4e4e4',
    },
};

export default withDataLoader(LmcDailyTotalTable, {
    enableMockData: true,
    errorMessage: 'No logs to show',
    url: ({ to, from, type }) => {
        let url = `${Keystone.adminPath}/api/reports/charts/${type}`;
        // possible to just pass a params object?
        if (from && to) {
            url += `?to=${to.toISOString()}&from=${from.toISOString()}`;
        } else if (to) {
            url += `?to=${to.toISOString()}`;
        } else if (from) {
            url += `?from=${from.toISOString()}`;
        };

        return url;
    },
});
