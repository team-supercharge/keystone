import LmcTimelineRow from './LmcTimelineRow.jsx';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';


const LogDay = (perDay, index) => {
	const total = _.get(perDay, 'logs.length') || 0;
	const Logs = _.sortBy(perDay.logs, d => -moment(d.timeLogged).toDate())
		.map((log, index) => <LmcTimelineRow key={log.id} log={log} index={index} total={total} />);

	return (
		<ul style={styles.logsList} key={index}>
			<li style={styles.logHeader}>
				<h2 style={styles.logDate}>
					{moment(perDay.date).format('ddd DD MMM')}
				</h2>
				<div className="lmc-theme-gradient" style={styles.divider}></div>
			</li>
			{ Logs }
		</ul>
	)
}
