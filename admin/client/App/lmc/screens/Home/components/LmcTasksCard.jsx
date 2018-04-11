import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router';
import {
    Button,
	GlyphButton,
	ResponsiveText,
} from '../../../../elemental';

const TaskCounter = (count, key) => {

    // http://localhost:3000/admin/tasks?filters=%5B%7B%22path%22%3A%22date%22%2C%22mode%22%3A%22before%22%2C%22inverted%22%3Afalse%2C%22value%22%3A%222018-04-09T11%3A00%3A00.000Z%22%2C%22before%22%3A%222018-04-09T00%3A00%3A00%2B01%3A00%22%2C%22after%22%3A%222018-04-09T00%3A00%3A00%2B01%3A00%22%7D%5D
    // need to ensure links numbers matched the link result! eg. filter by day?
    // only show these statuses
    const taskMap = {
        overdue: {
            color: "#e65d79e8",
            order: 1,
            params: '',   
        },
        pending: {
            color: "#ffba66",
            order: 2,
            params: 'filters=%5B%7B"path"%3A"status"%2C"inverted"%3Afalse%2C"value"%3A%5B"pending"%5D%7D%5D',   
        },
        completed: {
            color: "#9bd687e8",
            order: 3,
            params: 'filters=%5B%7B"path"%3A"status"%2C"inverted"%3Afalse%2C"value"%3A%5B"completed"%2C"skipped"%5D%7D%5D',   
        },
    };

    const background = {
        ...styles.taskCounter,
        background: taskMap[key] ? taskMap[key].color : '#e65d79',
    };

    const title = 'test';
    const to = `${Keystone.adminPath}/tasks?${taskMap[key].params}`;
    return (
        <Link
            key={key}
            tabIndex="-1"
            title={'test'}
            to={to}>
            <div style={background} className="">
                <strong>{ count }</strong> { key } today
            </div>
        </Link>
    )
}


class LmcTasksCard extends Component {
    render() {
        const { tasks, logs } = this.props;
        const logCountToday = logs && logs.length ? logs.length : 'No';
        
        const onClick = () => {
            this.props.onCreate('Task');
        }

        return (
            <div>
                <h2 className="lmc-card-title">
                    To-Do's & Logs
                </h2>
                <div className="lmc-card">
                    <div className="lmc-card-body">
                        {
                            tasks && tasks.results ? 
                                _.map(tasks.results, TaskCounter) : null
                        }
                        
                        
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
                        <p style={{ marginBottom: 0 }}>{ logCountToday } logs recorded today</p>
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
    taskCounter: {
        padding: '5px 10px',
        margin: 15,
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
