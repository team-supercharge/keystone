import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router';
import {
    Button,
	GlyphButton,
	ResponsiveText,
} from '../../../../elemental';
import moment from 'moment';


const TaskCounter = (row, index) => {

    const style = {
        ...styles.taskCounter,
        background: row.color,
    };

    const to = `${ Keystone.adminPath }/tasks?${ row.link }`;

    return (
        <div key={ index } style={ styles.task_container }>
            <Link
                style={ style }
                key={ index }
                title={ `row.label Tasks` }
                to={ to }>
                <strong>{ row.count }</strong> { row.label }
            </Link>
            <br/>
        </div>
    )
}

window.moment = moment;
class LmcTasksCard extends Component {

    renderTasks(tasks) {

        const isTodayFilter = {
            path: 'date',
            mode: 'on',
            value: moment().startOf('day').add(12, "hours").toISOString(),
            before: moment().endOf('day').toISOString(),
            after: moment().startOf('day').toISOString(),
        };

        const filterCompleted = JSON.stringify([
            {
                path: 'status',
                value: ['completed', 'skipped'],
            },
            isTodayFilter,
        ]);

        const filterPending = JSON.stringify([
            {
                path: 'status',
                value: ['pending'],
            },
            isTodayFilter,
        ]);

        const rows = [
            {
                label: 'Overdue Today',
                color: '#e65d79e8',
                link: `filters=${filterPending}`,
                count: tasks.overdue || 0,
            },
            {
                label: 'Pending Today',
                color: '#ffba66',
                link: `filters=${filterPending}`,
                count: tasks.pending || 0,
            },
            {
                label: 'Completed Today',
                color: '#9bd687e8',
                link: `filters=${filterCompleted}`,
                count: tasks.completed || 0,
            }
        ];

        return _.map(rows, TaskCounter);
    }

    render() {
        const { tasks, logs } = this.props;
        const logCountToday = logs && logs.length ? logs.length : 'No';

        const onClick = () => {
            this.props.onCreate('RecurringTask');
        }

        return (
            <div>
                <h2 className="lmc-card-title">
                    To-Do's & Logs
                </h2>
                <div className="lmc-card">
                    <div className="lmc-card-body">
                        <div style={{ paddingTop: 6 }} id="intro-js-step-tasks-info">
                            { this.renderTasks(tasks) }
                        </div>
                    </div>
                    <div className="lmc-card-footer">
                        <div className="lmc-flex-container">
                            <div style={{ maxWidth: 145 }}>
                                <GlyphButton
                                    block
                                    color="success"
                                    glyph="plus"
                                    onClick={onClick}
                                    position="left"
                                    title={`Add To-Do`}
                                >
                                    <ResponsiveText
                                        visibleSM="Add"
                                        visibleMD="Add"
                                        visibleLG={`Add To-Do`}
                                    />
                                </GlyphButton>
                            </div>
                            <p style={{ marginBottom: 0 }}>
                                { logCountToday } { logCountToday === 1 ? 'log' : 'logs' } recorded today
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    title: {
        opacity: 0.8,
    },
    task_container: {
        paddingBottom: 20,
    },
    taskCounter: {
        padding: '5px 10px',
        borderRadius: 30,
        fontWeight: 300,
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: 'white',
    }
}

LmcTasksCard.propTypes = {

};

export default LmcTasksCard;
