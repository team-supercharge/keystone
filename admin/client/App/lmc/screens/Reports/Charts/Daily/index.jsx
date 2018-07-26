import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import {
	LmcLogFilter,
	LmcPdfExport,
	LmcTimelineRow,
} from '../../../../components';
import LmcResidentSummary from './LmcResidentSummary.jsx';
import { BlankState } from '../../../../../elemental';


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


class LmcDaily extends React.Component {
	render () {
        let logsByDay;
		let logs = _.chain(this.props.logs)
			.sortBy(d => moment(d.timeLogged).toDate(), 'desc')
			.reverse()
			.value();

		const isEmpty = !logs || !logs.length;

		if (!isEmpty) {
			// group by date
			logsByDay = _(logs)
				.groupBy(({ timeLogged }) => moment(timeLogged).format('YYYY-MM-DD'))
				.map((group, date) => ({ date, logs: group }))
				.sortBy(({ date }) => -moment(date).valueOf())
				.value();
		}

		return (
			<div style={styles.container}>
				<div style={styles.logsContainer}>
					{ isEmpty
						? <BlankState heading={`No logs found...`} style={{ marginTop: 40 }} />
						: <div style={styles.chart}>
							{logsByDay.map(LogDay)}
						</div>
					}
				</div>
			</div>
		);
	}
}


LmcDaily.propTypes = {

};


const styles = {
	chart: {
		paddingLeft: 0,
		// height: '90vh',
		// overflow: 'scroll',
	},
	logDate: {
		marginBottom: '.30em',
		fontWeight: 'bold',
	},
	logHeader: {
		paddingBottom: 50,
	},
	filterContainer: {
		paddingBottom: 20,
	},
	subTitlePadding: {
		paddingLeft: 25,
	},
	paddedRight: {
		paddingRight: '3px !important',
	},
	subTitle: {
		paddingLeft: 10,
		color: '#848484',
		fontSize: 16,
	},
	summary: {
		color: '#444444',
		paddingBottom: 20,
	},
	logRow: {
		margin: '20px 0',
	},
	category: {
		color: '#7b7b7b',
	},
	logItemImg: {
		width: 40,
		margin: '8px 20px 0 0',
		float: 'left',
	},
	logsList: {
		paddingLeft: 0,
		paddingBottom: 0,
		listStyleType: 'none',
	},
    container: {
		minHeight: '60vh',
		margin: '30px 60px 30px 0',
	},
	smallText: {
		color: '#7b7b7b',
		fontSize: 11,
	},
	titleText: {
		fontWeight: 400,
		fontSize: 20,
		marginBottom: 3,
		lineHeight: '18px',
	},
	descriptionText: {
		fontSize: 12,
		marginLeft: 60,
		color: '#444444',
	},
	divider: {
		height: 2,
		width: '100%',
	}
}


export default LmcDaily;
