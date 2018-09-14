import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LmcTaskListResident from './LmcTaskListResident.jsx';
import moment from 'moment';
import _ from 'lodash';
import { css, StyleSheet } from 'aphrodite/no-important';
import { colors } from '../../../common/constants';


const OverdueLabel = () => (
    <span className={css(classes.taskCounterLabel, classes.taskCounter, classes.overdue)}>
        Overdue
    </span>
)

const DoneLabel = () => (
    <span className={css(classes.taskCounterLabel, classes.taskCounter, classes.completed)}>
        Done
    </span>
)

class LmcTaskListRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: true,
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

    renderTaskList(sortedTasks, residents) {
        // console.log(sortedTasks, residents, _.find(residents, {id: sortedTasks[0].resident.id}));
        return (
            <div className={css(classes.taskList)}>
                { sortedTasks.map((t, index) => (
                    <LmcTaskListResident
                        resident={_.find(residents, {id: t.resident._id})}
                        key={t.id}
                        task={t}
                        index={index}
                        total={sortedTasks.length}
                    />
                )) }
            </div>
        )
    }

    render() {
        const { data: { date, id, tasks }, residents } = this.props;
        if (!tasks || !tasks.length) {
            return null;
        }
        const { title } = tasks[0];
        const { showDetails } = this.state;
        let sortedTasks = _.sortBy(tasks, 'resident.name.first');
        const {
            completed,
            pending,
            isOverdue,
            isDone,
        } = this.getCounts(tasks, date);
        let titleWithoutGroup = (title.split('/')[1] || title).replace(/^\s/, '');;
        return (
            <tr>
                <td className={css(classes.detailsRow)}>
                    <p className={css(classes.taskTitleContainer)}
                        onClick={() => this.toggleDetails()}>
                        <span className={css(classes.date)}>
                            { moment(date).format('HH:MM') }
                        </span>
                        <span className={css(classes.taskTitle)}>
                            { titleWithoutGroup }
                        </span>
                    </p>
                    { showDetails
                        ? this.renderTaskList(sortedTasks, residents)
                        : null }
                </td>
                <td className={css(classes.counts)}>
                    <span className={css(classes.taskCounter, pending === 0 ? classes.empty : (isOverdue ? classes.overdue : classes.pending))}>
                        { pending }
                    </span>
                    <span className={css(classes.taskCounter, completed === 0 ? classes.empty : classes.completed)}>
                        { completed }
                    </span>
                </td>
                <td className={css(classes.countsLabel)}>
                    { isOverdue ? <OverdueLabel /> : null }
                    { isDone ? <DoneLabel /> : null }
                    {/* <div className={css(classes.speechBubble)}>
                        speechBubble
                    </div> */}
                </td>
            </tr>
        );
    }
}

const classes = StyleSheet.create({
    detailsRow: {
        padding: 5,
        fontSize: 16,
    },
    countsLabel: {
        verticalAlign: 'top',
        paddingTop: 12,
        textAlign: 'left',
    },
    taskList: {
        // listStyle: 'none',
        // listStyleImage: `url('https://s3.eu-west-2.amazonaws.com/lmc-data-production/public/list-style.png')`,
    },
    date: {
        paddingRight: 15,
        fontSize: 14,
        color: '#828282',
        background: '#fafafa',
    },
    counts: {
        verticalAlign: 'top',
        paddingTop: 7,
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
        color: colors.red,
        background: '#fafafa',
        paddingRight: 21,
    },
    taskCounterLabel: {
        position: 'relative',
        left: -30,
    },
    taskCounter: {
        padding: '5px 9px',
        margin: 8,
        fontSize: 12,
        lineHeight: '19px',
        borderRadius: 30,
        opacity: 0.9,
        textTransform: 'uppercase',
        color: 'white',
    },
    completed: {
        background: colors.green,
    },
    overdue: {
        background: colors.red,
    },
    pending: {
        background: colors.orange,
    },
    empty: {
        background: colors.bw10,
    },
    speechBubble: {
        position: 'relative',
        background: '#dc7485',
        borderRadius: '.4em',
        '::after': {
            content: '',
            position: 'absolute',
            left: 0,
            top: '50%',
            width: 0,
            height: 0,
            border: '25px solid transparent',
            borderRightColor: '#dc7485',
            borderLeft: 0,
            marginTop: -25,
            marginLeft: -25,
        }
    },
    'speechBubble:after': {
        content: '',
        position: 'absolute',
        left: 0,
        top: '50%',
        width: 0,
        height: 0,
        border: '25px solid transparent',
        borderRightColor: '#dc7485',
        borderLeft: 0,
        marginTop: -25,
        marginLeft: -25,
    }
});

LmcTaskListRow.propTypes = {
    index: PropTypes.number,
    total: PropTypes.number,
    data: PropTypes.object,
};

export default LmcTaskListRow;