import React from 'react';
import _ from 'lodash';
import { connect } from 'react-refetch';
import { Row, Col } from 'elemental';
import moment from 'moment';
import LmcColumnChart from './components/LmcColumnChart.jsx';
// import LmcHighcharts from '../Reports/Charts/charts/LmcHighcharts.jsx';
const ReactHighcharts = require('react-highcharts');

class LmcAdminHomeDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.renderHomeDetails = this.renderHomeDetails.bind(this);
        this.renderHomeList = this.renderHomeList.bind(this);
        this.renderHomeHeader = this.renderHomeHeader.bind(this);
    }

    renderHomeHeader(data) {
        return (
            <div style={styles.homeHeader}>
                <h2>
                    { data.home.name }
                </h2>
                <hr/>
                <h5>
                    Total Log Count: <strong>{ data.totalLogs }</strong>
                </h5>
                <h5>
                    Total Tasks Completed: <strong>{ data.totalTasks }</strong>
                </h5>
                <h5>
                    Active Residents: <strong>{ data.residents }</strong>
                </h5>
                <h5>
                    Active Carers: <strong>{ data.carers }</strong>
                </h5>
            </div>
        )
    }

    renderLogChart(logs) {
        const cutoffDate = moment().subtract(12, 'month').toDate();
        const chartData = _.chain(logs)
            .filter(row => moment(row.date, 'DD/MM/YYYY').isAfter(cutoffDate))
            .map(row => ([
                Date.parse(moment(row.date, 'DD/MM/YYYY').startOf('day').format()),
                row.count
            ]))
            .orderBy('0', 'asc')
            .value();

        const perDaySeries = [
            {
                name: 'Logs recorded',
                data: chartData,
                color: '#e65d79'
            }
        ];

        return (
            <div style={styles.logsChart}>
                <LmcColumnChart title="Logs Per Day" series={perDaySeries} />
            </div>
        )
    }

    renderTaskChart(tasks) {
        const cutoffDate = moment().subtract(12, 'month').toDate();
        const chartData = _.chain(tasks)
            .filter(row => moment(row.date, 'DD/MM/YYYY').isAfter(cutoffDate))
            .map(row => ([
                Date.parse(moment(row.date, 'DD/MM/YYYY').startOf('day').format()),
                row.count
            ]))
            .orderBy('0', 'asc')
            .value();

        const perDaySeries = [
            {
                name: 'Tasks Completed',
                data: chartData,
                color: '#e65d79'
            }
        ];

        return (
            <div style={styles.logsChart}>
                <LmcColumnChart title="Tasks Completed Per Day" series={perDaySeries} />
            </div>
        )
    }

    renderHomeDetails() {
        const { homeDetailFetch } = this.props;
        if (!homeDetailFetch) {
            return null
        };

        if (homeDetailFetch.pending) {
            return <h5>Loading...</h5>
        };

        if (homeDetailFetch.rejected) {
            return <h5>Oops... something went wrong</h5>
        }

        return (
            <div>
                { this.renderHomeHeader(homeDetailFetch.value)}
                <Row>
                    <Col sm="50%" lg="50%">
                        { this.renderLogChart(homeDetailFetch.value.logsPerDay) }
                    </Col>
                    <Col sm="50%" lg="50%">
                        { this.renderTaskChart(homeDetailFetch.value.tasksPerDay) }
                    </Col>
                </Row>
            </div>
        )
    }

    renderHomeList() {
        const { homeListFetch, fetchHomeDetails } = this.props;
        if (homeListFetch.pending) {
            return (
                <div style={styles.homeListContainer}>
                    <h5>Loading...</h5>
                </div>
            )
        };

        if (homeListFetch.rejected) {
            return (
                <div style={styles.homeListContainer}>
                    <h5>Oops... something went wrong</h5>
                </div>
            )
        }

        return (
            <div>
                {
                    homeListFetch.value.map(home => (
                        <div key={home.id}
                            style={styles.homeRow}
                            onClick={() => fetchHomeDetails(home.id)}>
                            <strong>{ home.name } ({home.group})</strong>
                            <span style={{ opacity: 0.6, paddingLeft: 10 }}>{ home.logCount }</span>
                        </div>   
                    ))
                }
            </div>
        )
    }

    render () {
        return (
            <Row style={styles.mainContainer}>
                <Col sm="33.333%" lg="33.333%" style={styles.homeList}>
                    { this.renderHomeList() }
                </Col>
                <Col sm="63%" lg="63%" style={styles.homeDetails}>
                    { this.renderHomeDetails() }
                </Col>
            </Row>
        );
    }
}

LmcAdminHomeDashboard.propTypes = {

};

const styles = {
    mainContainer: {
        height: '100%',
    },
    homeList: {
        // width: '30%',
        // float: 'left',
        height: '80vh',
        overflow: 'scroll',
    },
    homeDetails: {
        // width: '70%',
        paddingTop: 20,
        paddingHorisontal: 20,
        height: '90vh',
        overflow: 'scroll',
        // float: 'left'
    },
    homeHeader: {},
    homeRow: {
        ':hover': {
            backgroundColor: '#f9f9f9',
            
        },
        cursor: 'pointer',
        margin: 6
    },
    logsChart: {
        width: '100%',
        // height: 260
    }
};

export default connect(() => ({
    homeListFetch: `${Keystone.adminPath}/api/reports/admin/home/all`,
    fetchHomeDetails: (home_id) => {
        return {
            homeDetailFetch: `${Keystone.adminPath}/api/reports/admin/home/${home_id}`,
        }
    },
}))(LmcAdminHomeDashboard);
