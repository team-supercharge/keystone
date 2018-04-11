import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import LmcLogFilter from './LmcLogFilter.jsx';
import LmcTimelineRow from './LmcTimelineRow.jsx';
import LmcResidentSummary from './LmcResidentSummary.jsx';


const LogDay = (perDay) => {
	const total = _.get(perDay, 'logs.length') || 0;
	return (
		<ul style={styles.logsList}>
			<li style={styles.logHeader}>
				<h2>
					<strong>
						{ moment(perDay.date).format('ddd DD MMM') } 
					</strong>
				</h2>
				<div className="lmc-theme-gradient" style={styles.divider}></div>
			</li>
			{
				_.chain(perDay.logs)
					.sortBy(d => moment(d.timeLogged).toDate())
					.map(((log, index) => {
						return (
							<li>
								<LmcTimelineRow log={log} index={index} total={total} />
							</li>
						)
					}))
					.value()
			}
		</ul>
	)
}


class DailyChart extends React.Component {

	constructor(props) {
		super(props);
		this.state = { data: [] };
		this.onFilterChange = this.onFilterChange.bind(this);
	}

	componentDidMount() {
		this.setState({ logs: this.props.data });
	}

	onFilterChange(logs) {
		this.setState({ logs });
	}

	render () {
		let logsByDay;
		const { data, resident } = this.props;
		const { logs } = this.state;
		const isEmpty = !logs || !logs.length;

		if (!isEmpty) {
			// group by date
			logsByDay = _(logs)
				.groupBy(({ timeLogged }) => moment(timeLogged).format('YYYY-MM-DD')) 
				.map((group, date) => {
					return { date, logs: group }
				})
				.sortBy(({ date }) => -moment(date).valueOf())
				.value();
		}
		
		return (
			<div style={styles.logsContainer}>
				{
					isEmpty ?
						<p>
							Nothing to show
						</p> :
						<div style={styles.chart}>
							<LmcResidentSummary data={resident} />
							<LmcLogFilter data={data} onChange={this.onFilterChange} />
							{ logsByDay.map(LogDay) }
						</div>
				}
			</div>
		)
	}
}


class LmcResidentChart extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { resident, data } = this.props;

		let logs = _.chain(data)
			.get('results.logs')
			.sortBy(d => {
				return moment(d.timeLogged).toDate()	
			}, 'desc')
			.reverse()
			.value();

		return (
			<div style={styles.container}>
				{ resident ?
					<DailyChart data={logs} resident={resident} /> :
					<p>
						Please select a resident
					</p>
				}
			</div>
		);
	}
}


LmcResidentChart.propTypes = {

};


const styles = {
	chart: {
		paddingLeft: 20,
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
        margin: '30px 60px 30px 0'
	},
	logsContainer: {
		height: '80vh',
		overflow: 'scroll',
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