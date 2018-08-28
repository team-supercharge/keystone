import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LmcTaskListRow from './LmcTaskListRow.jsx';


class LmcTaskList extends Component {
    renderHeader() {
        return (
            <tr>
                <th style={styles.date}>
                    
                </th>
                <th style={styles.todoLabel}>
                    Todo
                </th>
                <th colSpan="2">
                    Pending / Complete
                </th>
            </tr>
        );
    }

    render() {
        const { data } = this.props;
        return (
            <table style={styles.table}>
                { this.renderHeader() }
                { data.map(row =>
                    <LmcTaskListRow data={row} />
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
    todoLabel: {
        textAlign: 'left',
        fontSize: 18,
        paddingLeft: 10,
        minWidth: '70%',
        width: '70%',
    }
}
LmcTaskList.propTypes = {
    data: PropTypes.array.isRequired,
};

export default LmcTaskList;
