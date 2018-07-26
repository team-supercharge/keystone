import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import LmcTimelineRow from './LmcTimelineRow.jsx';


class LmcChartLogList extends Component {
    render() {
        const logs = _.sortBy(this.props.logs, d => -moment(d.timeLogged).toDate());
        return (
            <div style={styles.container}>
                {/* <h2 style={styles.heading}>
					Logs
				</h2> */}
                <ul style={styles.logsList}>
                    {logs.map((log, i) => (
                        <LmcTimelineRow
                            dateFormat="ddd DD MMM HH:MM"
                            date={d => ''}
                            key={log.id}
                            log={log}
                            index={i}
                            total={logs.length} />
                    ))}
                </ul>
            </div>
        );
    }
}

const styles = {
    container: {
        marginTop: 100,
        marginBottom: 100,
        marginLeft: '35%',
        width: '40%',
    },
    heading: {
        paddingTop: 30,
        paddingBottom: 20,
    },
    logsList: {
		paddingLeft: 0,
		paddingBottom: 0,
		listStyleType: 'none',
	},
}

export default LmcChartLogList;
