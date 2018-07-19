import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BlankState } from '../../../../elemental';
import { connect } from 'react-refetch';

import LmcChartsDashboard from './Dashboard/index.jsx';
import LmcDaily from './Daily/index.jsx';


class LmcChart extends Component {

    renderChart(props) {
        switch (props.params.chart_type) {
            case 'dashboard':
                return <LmcChartsDashboard {...props} />;
            case 'daily':
                return <LmcDaily {...props} />;
            default:
                return <BlankState heading={'That\s not a report!'} style={styles.blankSlate} />;
        }

    }

    render() {
        const { dataFetch } = this.props;
        return (
            dataFetch.pending
                ? <p>Loading</p>
                : dataFetch.fulfilled
                    ? this.renderChart(this.props)
                    : <BlankState heading={'You haven\'t added any residents yet'} style={styles.blankSlate} />
        );
    }
}

const styles = {
    blankSlate: {
        margin: 40,
    }
}

LmcChart.propTypes = {

};

export default connect(({ params }) => ({
    dataFetch: `${Keystone.adminPath}/api/reports/charts/${params.chart_type}/${params.resident_id}`,
}))(LmcChart);
