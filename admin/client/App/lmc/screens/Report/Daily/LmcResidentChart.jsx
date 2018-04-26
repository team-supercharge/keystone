import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import LmcLogFilter from './LmcLogFilter.jsx';
import LmcTimelineRow from './LmcTimelineRow.jsx';
import LmcResidentSummary from './LmcResidentSummary.jsx';
import { BlankState } from '../../../../elemental';


const LogDay = (perDay, index) => {
	const total = _.get(perDay, 'logs.length') || 0;
	return (
		<ul style={styles.logsList} key={index}>
			<li style={styles.logHeader}>
				<h2>
					<strong>
						{moment(perDay.date).format('ddd DD MMM')}
					</strong>
				</h2>
				<div className="lmc-theme-gradient" style={styles.divider}></div>
			</li>
			{
				_.chain(perDay.logs)
					.sortBy(d => -moment(d.timeLogged).toDate())
					.map(((log, index) => <LmcTimelineRow log={log} index={index} total={total} />))
					.value()
			}
		</ul>
	)
}


class LmcResidentChart extends React.Component {

	constructor(props) {
		super(props);
		this.state = { data: [] };
		this.onFilterChange = this.onFilterChange.bind(this);
	}

	onFilterChange(logs) {
		this.setState({ logs });
	}

	render() {
		const { resident, data } = this.props;
		let logsByDay;
		let logs = _.chain(data)
			.get('results.logs')
			.sortBy(d => {
				return moment(d.timeLogged).toDate();
			}, 'desc')
			.reverse()
			.value();

		console.log("logs.length", logs.length);

		const isEmpty = !logs || !logs.length;

		if (!isEmpty) {
			// group by date
			logsByDay = _(logs)
				.groupBy(({ timeLogged }) => moment(timeLogged).format('YYYY-MM-DD')) 
				.map((group, date) => {
					return { date, logs: group };
				})
				.sortBy(({ date }) => -moment(date).valueOf())
				.value();
		}

		return (
			<div style={styles.container}>
				<div style={styles.logsContainer}>
				<LmcResidentSummary data={resident} />
					{ isEmpty
						? <BlankState heading={`No logs found...`} style={{ marginTop: 40 }} />
						: <div style={styles.chart}>
							<LmcLogFilter data={data} onChange={this.onFilterChange} />
							{logsByDay.map(LogDay)}
						</div>
					}
				</div>
			</div>
		);
	}
}


LmcResidentChart.propTypes = {

};


const styles = {
	chart: {
		paddingLeft: 0,
		// height: '90vh',
		// overflow: 'scroll',
	},
	logHeader: {
		paddingBottom: 50,
	},
	filterContainer: {
		paddingBottom: 20,
	},
	subTitlePadding: {
		paddingLeft: "25px",
	},
	paddedRight: {
		paddingRight: "3px !important",
	},
	subTitle: {
		paddingLeft: 10,
		color: "#848484",
		fontSize: 16,
	},
	summary: {
		color: "#444444",
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
		float: 'left'
	},
	logsList: {
		paddingLeft: 0,
		paddingBottom: 0,
		listStyleType: 'none',
	},
    container: {
		minHeight: '60vh',
        margin: '30px 60px 30px 0'
	},
	logsContainer: {
		
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


export default LmcResidentChart;