import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import {
    BlankState,
} from '../../elemental';
import LmcTimelineRow from './LmcTimelineRow.jsx';


export default class LmcLogTimeline extends React.Component {
	groupByDay(logs) {
		return _.chain(logs)
			.map(log => {
				let timeLogged = moment(log.timeLogged);
				return {
					...log,
					date: timeLogged.format('YYYY-MM-DD'),
					timeLoggedDate: timeLogged.toDate(),
					timeLogged
				}
			})
			.groupBy('date')
			.map((group, date) => ({
				date,
				logs: _.sortBy(group, '-timeLoggedDate')
			}))
			.sortBy(({ date }) => -moment(date).valueOf())
			.value();
	}

	renderLogs(section) {
		const total = _.get(section, 'logs.length') || 0;
		return (<div>{
			section.logs.map((log, index) => (
					<LmcTimelineRow
						key={log.id}
						item={log}
						index={index}
						total={total}
					/>
				))
		}</div>)
	}

	renderSection(section, index) {
		return (
			<ul style={styles.logsList} key={index}>
				<li style={styles.logHeader}>
					<h2 style={styles.logDate}>
						{moment(section.date).format('ddd DD MMM')}
					</h2>
					<div className="lmc-theme-gradient" style={styles.divider} />
				</li>
				{ this.renderLogs(section) }
			</ul>
		);
	}

	render() {
		const { logs } = this.props;
		const isEmpty = !logs || !logs.length;
		const sections = this.groupByDay(logs);

		return (
			<div style={styles.container}>
				<div style={styles.logsContainer}>
					{ isEmpty
						? <BlankState heading={`No logs found...`} style={{ marginTop: 40 }} />
						: sections.map((section, index) => this.renderSection(section, index))
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
