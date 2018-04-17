import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router';
import {
    Button,
	GlyphButton,
	ResponsiveText,
} from '../../../../elemental';


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


class LmcTasksCard extends Component {

    renderTasks(tasks) {

        const rows = [
            {
                label: 'Overdue Today',
                color: '#e65d79e8',
                link: 'filters=%5B%7B"path"%3A"status"%2C"inverted"%3Afalse%2C"value"%3A%5B"pending"%5D%7D%5D',
                count: _.get(tasks, 'results.overdue') || 0,
            },
            {
                label: 'Pending Today',
                color: '#ffba66',
                link: 'filters=%5B%7B"path"%3A"status"%2C"inverted"%3Afalse%2C"value"%3A%5B"pending"%5D%7D%5D',
                count: _.get(tasks, 'results.pending') || 0,
            },
            {
                label: 'Completed Today',
                color: '#9bd687e8',
                link: 'filters=%5B%7B"path"%3A"status"%2C"inverted"%3Afalse%2C"value"%3A%5B"completed"%2C"skipped"%5D%7D%5D',
                count: _.get(tasks, 'results.completed') || 0,
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
                        { this.renderTasks(tasks) }
                    </div>
                    <div className="lmc-card-footer">
                        <div style={{ maxWidth: 145 }}>
                            <GlyphButton
                                block
                                color="success"
                                glyph="plus"
                                onClick={onClick}
                                position="left"
                                title={`Create To-Do`}
                            >
                                <ResponsiveText
                                    visibleSM="Create"
                                    visibleMD="Create"
                                    visibleLG={`Create To-Do`}
                                />
                            </GlyphButton>
                        </div>
                        <p style={{ marginBottom: 0 }}>
                            { logCountToday } { logCountToday === 1 ? 'log' : 'logs' } recorded today
                        </p>
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
