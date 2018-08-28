import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LmcTaskListResident from './LmcTaskListResident.jsx';
import moment from 'moment';
import _ from 'lodash';
import { css, StyleSheet } from 'aphrodite/no-important';

class LmcTaskListRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false
        }
        this.toggleDetails = this.toggleDetails.bind(this);
    }

    toggleDetails() {
        this.setState({
            showDetails: !this.state.showDetails,
        })
    }

    getCounts(tasks, date) {
        const pending = _.filter(tasks, { status: 'pending' }).length;
        const today = moment();
        const isDone = pending === 0;
        return {
            completed: tasks.length - pending,
            pending,
            isDone,
            isOverdue: !isDone && (moment(tasks[0].date).isBefore(moment())),
        }
    }

    render() {
        const { data: { date, id, tasks } } = this.props;
        if (!tasks || !tasks.length) {
            return null;
        }
        const { title } = tasks[0];
        const { showDetails } = this.state;
        let sortedTasks = _.sortBy(tasks, t => -moment(t.date));
        const {
            completed,
            pending,
            isOverdue,
            isDone,
        } = this.getCounts(tasks, date);
        return (
            <tr>
                <td className={css(classes.dateRow)}>
                    { moment(date).format('HH:MM') }
                </td>
                <td className={css(classes.detailsRow)}>
                    <p className={css(classes.taskTitleContainer)}
                        onClick={() => this.toggleDetails()}>
                        <span className={css(classes.taskTitle)}>
                            { title.split('/')[1] }
                        </span>
                    </p>
                    { showDetails
                        ? sortedTasks.map((t, index) => (
                            <LmcTaskListResident
                                key={t.id}
                                task={t}
                                row={index}
                                total={sortedTasks.length}
                            />
                        ))
                        : null }
                </td>
                <td className={css(classes.counts)}>
                    { completed } / { pending }
                    { isOverdue ? 'Overdue' : null }
                    { isDone ? 'Done' : null }
                </td>
            </tr>
        );
    }
}

const classes = StyleSheet.create({
    detailsRow: {
        padding: 10,
        fontSize: 16,
    },
    dateRow: {
        padding: '13px 10px 10px',
        opacity: 0.6,
        fontSize: 14,
        textAlign: 'right',
        verticalAlign: 'top',
    },
    counts: {
        verticalAlign: 'top',
        textAlign: 'center',
    },
    taskTitleContainer: {
        borderBottom: '1px solid #d6d6d6',
        width: '100%',
        marginTop: 11,
        lineHeight: '1px',
        cursor: 'pointer',
        ':hover': {
            textDecoration: 'underline',
        }
    },
    taskTitle: {
        color: '#e5627e',
        background: '#fafafa',
        paddingRight: 21,
    }
});

LmcTaskListRow.propTypes = {
    index: PropTypes.number,
    total: PropTypes.number,
    data: PropTypes.object,
};

export default LmcTaskListRow;