import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import {
    BlankState,
    GlyphButton,
    Button,
} from '../../../../../elemental';
import _ from 'lodash';
import { connect } from 'react-refetch';
import moment from 'moment';
import LmcTimelineRow from '../../../../components/LmcTimelineRow.jsx';

window.moment = moment;

const LogDay = (perDay, index) => {
	const total = _.get(perDay, 'logs.length') || 0;
	const Logs = _.sortBy(perDay.logs, d => -moment(d.timeLogged).toDate())
		.map((log, i) => <LmcTimelineRow key={log.id} log={log} index={i} total={total} />);

	return (
		<ul style={styles.logsList} key={`${perDay.date}_${index}`}>
			<li style={styles.logHeader}>
				<h2 style={styles.logDate}>
					{moment(perDay.date).format('ddd DD MMM')}
				</h2>
				<div className="lmc-theme-gradient" style={styles.divider} />
			</li>
			{ Logs }
		</ul>
	)
}


class LmcResidentLatestLogs extends Component {
    renderEmpty() {
        return (
            <BlankState heading={`No logs found`} />
        )
    }

    renderLogs(logs, resident_id) {
        const LogsByDay = _.chain(logs)
            .groupBy(({ timeLogged }) => moment(timeLogged).format('YYYY-MM-DD'))
            .map((group, date) => ({ date, logs: group }))
            .sortBy(({ date }) => -moment(date).toDate())
            .value()
            .map(LogDay);

        return (
            <div style={{ paddingTop: 16, paddingRight: 30, borderRight: '1px solid #e0e0e0' }}>
                <Link to={`${Keystone.adminPath}/reports/charts/daily/${resident_id}`} style={{ float: 'right', paddingTop: 12 }}>
                    <Button color="default">
                        <span style={{ opacity: 0.6 }}>
                            View All Logs
                        </span>
                    </Button>
                </Link>
                { LogsByDay }
            </div>
        )
    }

    renderLoading() {
        return (
            <BlankState heading={`Loading...`} />
        )
    }

    render() {
        const { logsFetch, resident_id } = this.props;
        console.log(logsFetch);
        const isReady = logsFetch.fulfilled && _.get(logsFetch, 'value.results.length');
        return (
            <div>
                { logsFetch.pending
                    ? this.renderLoading()
                    : isReady
                        ? this.renderLogs(logsFetch.value.results, resident_id)
                        : this.renderEmpty()
                }
            </div>
        );
    }
}

const styles = {
    logDate: {
		marginBottom: '.30em',
	},
	logHeader: {
		paddingBottom: 34,
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

LmcResidentLatestLogs.propTypes = {
    resident_id: PropTypes.string.isRequired,
};

export default connect(({ resident_id }) => ({
    logsFetch: `${Keystone.adminPath}/api/reports/residents/${resident_id}/logs?limit=10`,
}))(LmcResidentLatestLogs);

