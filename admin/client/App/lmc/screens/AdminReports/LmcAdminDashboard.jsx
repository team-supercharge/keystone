import React from 'react';
import _ from 'lodash';
import { connect } from 'react-refetch';
import moment from 'moment';
import LmcColumnChart from './components/LmcColumnChart.jsx';
import { Row, Col } from 'elemental';

// import LmcHighcharts from '../Reports/Charts/charts/LmcHighcharts.jsx';

class LmcAdminDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.renderLogsChart = this.renderLogsChart.bind(this)
    }

    renderLogsChart() {
        const { logsFetch } = this.props;
        if (logsFetch.pending) {
            return (
                <div style={styles.mainContainer}>
                    <h5>Loading...</h5>
                </div>
            )
        };

        if (logsFetch.rejected) {
            return (
                <div style={styles.mainContainer}>
                    <h5>Oops... something went wrong</h5>
                </div>
            )
        }

        const cutoffDate = moment().subtract(12, 'month').toDate();
        const chartData = _.chain(logsFetch.value.data)
            .filter(row => moment(row.date, 'DD/MM/YYYY').isAfter(cutoffDate))
            .map(row => ([
                Date.parse(moment(row.date, 'DD/MM/YYYY').startOf('day').format()),
                row.count
            ]))
            .orderBy('0', 'asc')
            .value();

        let totalCount = 0;
        const total = chartData.map((row) => {
                totalCount += row[1];
                return [
                    row[0],
                    totalCount,
                ]
            });

        const perDaySeries = [
            {
                name: 'Logs recorded',
                data: chartData,
                color: '#e65d79'
            }
        ];

        const totalSeries = [
            {
                name: 'Logs recorded',
                data: total,
                color: '#e65d79'
            }
        ];

        return (
            <Row>
                <Col sm="50%" lg="50%">
                    <LmcColumnChart title="Logs Per Day" height={500} series={perDaySeries} />
                </Col>
                <Col sm="50%" lg="50%">
                    <LmcColumnChart title="Total Log Count" height={500} series={totalSeries} />
                </Col>
            </Row>
        )
    }

    render () {
        return (
            <div style={styles.mainContainer}>
                { this.renderLogsChart() }
            </div>
        );
    }
}

LmcAdminDashboard.propTypes = {

};

const styles = {
    mainContainer: {
        height: '100%',
        padding: 30,
        // margin: 60
    },
};

export default connect(() => ({
    logsFetch: `${Keystone.adminPath}/api/reports/admin/log/all`,
}))(LmcAdminDashboard);
