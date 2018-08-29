import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LmcTaskListRow from './LmcTaskListRow.jsx';
import _ from 'lodash';
import moment from 'moment';

class LmcTaskList extends Component {
    renderHeader() {
        return (
            <tr>
                <th style={styles.todoLabel}>
                    To-Do
                </th>
                <th style={styles.countLabel}>
                    Pending / Complete
                </th>
                <th style={styles.tagLabel}></th>
            </tr>
        );
    }

    render() {
        const { data } = this.props;
        const tasksSorted = _.sortBy(data, d => moment(d.date).toDate());
        return (
            <table style={styles.table}>
                { this.renderHeader() }
                { tasksSorted.map(row =>
                    <LmcTaskListRow key={row.id} data={row} />
                )}
            </table>
        );
    }
}
const styles = {
    date: {
        width: 100,
        padding: 10,
        textAlign: 'right',
    },
    table: {
        maxWidth: '70%',
        margin: '0 auto',
        border: 'none'
    },
    countLabel: {
        fontSize: 17,
        minWidth: 170,
    },
    tagLabel: {
        minWidth: 100,
    },
    todoLabel: {
        textAlign: 'left',
        fontSize: 18,
        paddingLeft: 58,
        minWidth: '70%',
        width: '70%',
    }
}
LmcTaskList.propTypes = {
    data: PropTypes.array.isRequired,
};

export default LmcTaskList;
