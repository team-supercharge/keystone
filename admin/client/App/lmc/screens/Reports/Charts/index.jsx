import React from 'react';
import _ from 'lodash';
import LmcResidentList from '../../../components/LmcResidentList.jsx';
import { BlankState } from '../../../../elemental';
import withDataLoader from './withDataLoader.jsx';
import withToolbar from './withToolbar.jsx';
import {
    LmcActivityChart,
    LmcHealthVisitChart,
    LmcIncidentsChart,
    LmcBloodOxygenChart,
    LmcBloodPressureChart,
    LmcChartsDashboard,
    LmcDailyChart,
    LmcFluidsChart,
    LmcFoodChart,
    LmcHeartRateChart,
    LmcMoodChart,
    LmcMobilityChart,
    LmcMustScoreChart,
    LmcTemperatureChart,
    LmcStoolChart,
    LmcTurnsChart,
    LmcWaterlowChart,
    LmcWeightChart,
} from './charts';


class LmcCharts extends React.Component {

    renderChart ({ data, params }) {
        if (!params.chart_type || !params.resident_id) {
            return <BlankState heading={'Oops! Something went wrong.'} style={styles.blankSlate} />;
        }

        const resident = _.find(data, { id: params.resident_id });
        const chartProps = { resident, params };

        // map reporting_id to chart component
        const chartMap = {
            dashboard: LmcChartsDashboard,
            daily: LmcDailyChart,
            meal: LmcFoodChart,
            fluids: LmcFluidsChart,
            must: LmcMustScoreChart,
            stool: LmcStoolChart,
            turns: LmcTurnsChart,
            weight: LmcWeightChart,
            waterlow: LmcWaterlowChart,
            temperature: LmcTemperatureChart,
            mood: LmcMoodChart,
            mobility: LmcMobilityChart,
            heart_rate: LmcHeartRateChart,
            blood_oxygen: LmcBloodOxygenChart,
            blood_pressure: LmcBloodPressureChart,
            activity_social: LmcActivityChart,
            health_visit: LmcHealthVisitChart,
            incident: LmcIncidentsChart,
        };

        const Chart = chartMap[params.chart_type];
        if (Chart) {
            const ChartWithLoader = withDataLoader(Chart, {
                url: ({ params }) => `${Keystone.adminPath}/api/reports/charts/${params.chart_type}/${params.resident_id}`,
                errorMessage: 'No logs to show',
                enableMockData: !_.includes(['dashboard', 'mobility', 'health_visit', 'incident', 'activity_social'], params.chart_type),
            });
            return <ChartWithLoader {...chartProps} />;
        } else {
            const LmcBlankSlate = withToolbar(BlankState);
            return <LmcBlankSlate heading={'That\s not a chart!'} style={styles.blankSlate} />;
        }
    }

    render () {
        // data === residents[]
        const { data, params } = this.props;
        const chart_type = params.chart_type || 'dashboard';

        if (!data || !data.length) {
            return (
                <BlankState heading={'You haven\'t added any residents yet'} style={styles.blankSlate} />
            );
        }

        return (
            <div className="row" style={styles.mainContainer}>
                <div className="three columns lmc-box-shadow__right">
                    <div style={styles.container}>
                        <div style={styles.childrenContainer}>
                            <LmcResidentList
                                data={data}
                                resident_id={params.resident_id}
                                link={resident_id => `${Keystone.adminPath}/reports/charts/${chart_type}/${resident_id}`}
                            />
                        </div>
                    </div>
                </div>
                <div className="nine columns" style={{ marginLeft: 10, width: '78% !important' }}>
                    <div style={styles.container}>
                        <div style={{ borderRight: '1px solid #e1e1e1', ...styles.childrenContainer }}>
                            <div style={{ width: '100%', paddingRight: 25, paddingLeft: 10 }}>
                                {this.renderChart(this.props)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

LmcCharts.propTypes = {

};

const styles = {
    mainContainer: {
        height: '100%',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '85vh',
    },
    childrenContainer: {
        width: '100%',
        display: 'flex',
        overflowY: 'auto',
        minHeight: 0,
    },
    sidebar: {
        maxWidth: 300,
    },
    blankSlate: {
        margin: 40,
    },
};

export default withDataLoader(LmcCharts, {
    url: () => `${Keystone.adminPath}/api/reports/residents_v0`,
    errorMessage: 'You haven\'t added any residents yet',
});
