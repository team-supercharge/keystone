import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import _ from 'lodash';
import {
    Button,
} from '../../../../../elemental';
import { connect } from 'react-refetch';
import {
	LmcLoadingScreen,
	LmcLogTimeline,
} from '../../../../components';


class LmcResidentLatestLogs extends Component {
    render() {
		const { logsFetch, resident_id } = this.props;
		const isEmpty = _.get(logsFetch, 'value.results.length');
		return (
            logsFetch.pending
                ? <LmcLoadingScreen />
				: <div>
					{ isEmpty ? <Link to={`${Keystone.adminPath}/reports/charts/daily/${resident_id}`} style={styles.viewAllButton}>
						<Button color="default">
							View All Logs
						</Button>
					</Link> : null }
					<LmcLogTimeline logs={logsFetch.value.results} />
				</div>
        );
    }
}

const styles = {
	viewAllButton: {
		float: 'right',
		paddingTop: 0,
	},
};

LmcResidentLatestLogs.propTypes = {
    resident_id: PropTypes.string.isRequired,
};

export default connect(({ resident_id, mock }) => ({
    logsFetch: `${Keystone.adminPath}/api/reports/residents/${resident_id}/logs?limit=10${ mock ? '&mock=1' : ''}`,
}))(LmcResidentLatestLogs);

