import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import {
    BlankState,
} from '../../elemental';
import LmcTimelineRow from './LmcTimelineRow.jsx';


const LmcLogDay = (perDay, index) => {
	const total = _.get(perDay, 'logs.length') || 0;
	const Logs = _.sortBy(perDay.logs, d => -moment(d.timeLogged).toDate())
		.map((log, index) => <LmcTimelineRow key={log.id} log={log} index={index} total={total} />);

	return (
		<ul style={styles.logsList} key={index}>
			<li style={styles.logHeader}>
				<h2 style={styles.logDate}>
					{moment(perDay.date).format('ddd DD MMM')}
				</h2>
				<div className="lmc-theme-gradient" style={styles.divider} />
			</li>
			{ Logs }
		</ul>
	);
};

export default class LmcLogTimeline extends React.Component {
    groupByDay(logs) {
        return _.chain(logs)
            .sortBy(d => moment(d.timeLogged).toDate(), 'desc')
            .reverse()
            .groupBy(({ timeLogged }) => moment(timeLogged).format('YYYY-MM-DD'))
            .map((group, date) => ({ date, logs: group }))
            .sortBy(({ date }) => -moment(date).valueOf())
            .value();
    }
    render() {
        const { logs } = this.props;
        const isEmpty = !logs || !logs.length;
        const logsByDay = this.groupByDay(logs);
		return (
			<div style={styles.container}>
				<div style={styles.logsContainer}>
					{ isEmpty
						? <BlankState heading={`No logs found...`} style={{ marginTop: 40 }} />
						: logsByDay.map(LmcLogDay)
					}
				</div>
			</div>
        );
    }
}


const styles = {
    container: {
		minHeight: '50vh',
		margin: '30px 0',
	},
    logsList: {
		paddingLeft: 0,
		paddingBottom: 0,
		listStyleType: 'none',
    },
    logHeader: {
		paddingBottom: 35,
    },
    logDate: {
		marginBottom: '.30em',
		fontWeight: 300,
		// opacity: 0.7,
	},
    divider: {
		height: 2,
		width: '100%',
	},
}
