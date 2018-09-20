import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LmcTaskListRow from './LmcTaskListRow.jsx';
import _ from 'lodash';
import moment from 'moment';
import { css, StyleSheet } from 'aphrodite/no-important';


class LmcTaskList extends Component {
    renderHeader() {
        return (
            <tr className={css(classes.tableHeader)}>
                <th className={css(classes.todoLabel)}>
                    To-Do
                </th>
                <th className={css(classes.countLabel)}>
                    Pending / Complete
                </th>
                <th className={css(classes.tagLabel)}></th>
            </tr>
        );
    }

    render() {
        const { data, residents } = this.props;
        const tasksSorted = _.sortBy(data, d => moment(d.date).toDate());
        return (
            <table className={css(classes.table)}>
                { this.renderHeader() }
                { tasksSorted.map(row =>
                    <LmcTaskListRow key={row.id} data={row} residents={residents} />
                )}
            </table>
        );
    }
}

const classes = StyleSheet.create({
    date: {
        width: 100,
        padding: 10,
        textAlign: 'right',
    },
    table: {
        maxWidth: 750,
        margin: '0 auto',
        border: 'none'
    },
    tableHeader: {
        lineHeight: '50px',
    },
    countLabel: {
        fontSize: 17,
        minWidth: 170,
        position: 'relative',
        left: 6,
    },
    tagLabel: {
        minWidth: 100,
    },
    todoLabel: {
        textAlign: 'left',
        fontSize: 18,
        paddingLeft: 66,
        minWidth: '70%',
        width: '70%',
    }
});

LmcTaskList.propTypes = {
    data: PropTypes.array.isRequired,
};

export default LmcTaskList;
