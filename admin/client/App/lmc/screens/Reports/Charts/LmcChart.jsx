import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-refetch';
import _ from 'lodash';
import { BlankState, GlyphButton } from '../../../../elemental';
import LmcChartsDashboard from './Dashboard/index.jsx';
import LmcDaily from './Daily/index.jsx';
import LmcBarChart from './BarChart/index.jsx';
import LmcFoodChart from './Food/index.jsx';
import LmcFluidsChart from './Fluids/index.jsx';
import LmcTurnsChart from './Turns/index.jsx';
import LmcStoolChart from './Stool/index.jsx';
import LmcColumnChart from './ColumnChart/index.jsx';
import LmcLineChart from './LineChart/index.jsx';
import LmcLoadingScreen from '../../../components/LmcLoadingScreen.jsx';
import withToolbar from './withToolbar.jsx';


const BackButton = ({ params }) => {
    return <GlyphButton
        component={Link}
        glyph="chevron-left"
        position="left"
        to={`${Keystone.adminPath}/reports/charts/dashboard/${params.resident_id}`}
        variant="link">
        Dashboard
    </GlyphButton>
}


class LmcChart extends Component {
    renderChart(props) {
        /**
         * ToDo - Refactor: pull out all config into plain JSON?
         * There's too much repetition
         */

        const chartProps = {
            resident: props.resident,
            params: props.params,
            dataFetch: props.dataFetch,
        }

        switch (props.params.chart_type) {
        case 'dashboard':
            return <LmcChartsDashboard {...chartProps} />;
        case 'daily':
            const LmcDailyChart = withToolbar(LmcDaily, {
                dateFilter: {
                    left: true,
                },
                pdfExport: {
                    title: 'Daily Report',
                    headerDate: false,
                    groupBy: 'date',
                    dateFormat: 'HH:mm',
                }
            });
            return <LmcDailyChart {...chartProps} />;
        case 'meal':
            const LmcFood = withToolbar(LmcFoodChart, { pdfExport: { title: 'Food Consumed' } });
            return (<LmcFood
                type="meal"
                yMax={6}
                yAxisLabel="Portions Consumed"
                title="Food Portions vs. Time"
                {...chartProps} />);
        case 'fluids':
            const LmcFluid = withToolbar(LmcFluidsChart, { pdfExport: { title: 'Fluids Charts' } });
            return (<LmcFluid
                type="fluids"
                yAxisLabel="Fluids In / Out (ml)"
                title="Fluids in and out vs. Time"
                {...chartProps} />);
        case 'must':
            const LmcMustChart = withToolbar(LmcLineChart, { pdfExport: { title: 'MUST Score' } });
            return (<LmcMustChart
                type="must"
                yMax={5}
                yAxisLabel="MUST Score"
                title="MUST Score vs. Time"
                subTitle="Malnutrition Universal Screening Tool"
                {...chartProps} />);
        case 'stool':
            const LmcStool = withToolbar(LmcStoolChart, { pdfExport: { title: 'MUST Score' } });
            return (<LmcStool
                type="stool"
                yMax={5}
                yAxisLabel="MUST Score"
                title="MUST Score vs. Time"
                subTitle="Malnutrition Universal Screening Tool"
                {...chartProps} />);
        case 'turns':
            const LmcTurns = withToolbar(LmcTurnsChart, { pdfExport: { title: 'Turns' } });
            return (<LmcTurns
                type="turns"
                yMax={5}
                yAxisLabel="MUST Score"
                title="MUST Score vs. Time"
                subTitle="Malnutrition Universal Screening Tool"
                {...chartProps} />);
        case 'temperature':
            const LmcTempChart = withToolbar(LmcLineChart, { pdfExport: { title: 'Temperature' } });
            return (<LmcTempChart
                type="temperature"
                yMin={30}
                yAxisLabel="Temperature (C)"
                title="Temperature vs. Time"
                {...chartProps} />);
        case 'mood':
            const LmcMoodChart = withToolbar(LmcLineChart, { pdfExport: { title: 'Mood' } });
            return (<LmcMoodChart
                type="mood"
                yMax={5}
                yAxisLabel="Mood"
                title="Mood vs. Time"
                subTitle="1 = Very Bad, 2 = Bad, 3 = Neutral, 4 = Good, 5 = Very Good"
                {...chartProps} />);
        case 'weight':
            const LmcWeightChart = withToolbar(LmcLineChart, { pdfExport: { title: 'Weight Chart' } });
            return (<LmcWeightChart
                type="weight"
                yAxisLabel="Weight (kg)"
                title="Weigh vs. Time"
                {...chartProps} />);
        case 'blood_pressure':
            const LmcPressureChart = withToolbar(LmcLineChart, { pdfExport: { title: 'Blood Pressure Chart' } });
            const series = [
                { type: 'blood_pressure_upper', label: 'Upper (Systolic)' },
                { type: 'blood_pressure_lower', label: 'Lower (Diastolic)' },
            ];

            return (<LmcPressureChart
                legendEnabled
                series={series}
                yAxisLabel="Blood Pressure (mm Hg)"
                title="Blood Pressure vs. Time"
                {...chartProps} />);
        case 'waterlow':
            const LmcWaterlowChart = withToolbar(LmcLineChart, { pdfExport: { title: 'Waterlow Score' } });
            return (<LmcWaterlowChart
                type="waterlow"
                yAxisLabel="Waterlow Score"
                title="Waterlow Score vs. Time"
                {...chartProps} />);
        case 'blood_oxygen':
            const LmcOxygenChart = withToolbar(LmcLineChart, { pdfExport: { title: 'Blood Oxygen Chart' } });
            return (<LmcOxygenChart
                type="blood_oxygen"
                yAxisLabel="Blood Oxygen Level (mmHg)"
                title="Blood Oxygen (mmHg) vs. Time"
                {...chartProps} />);
        case 'heart_rate':
            const LmcHeartRateChart = withToolbar(LmcLineChart, { pdfExport: { title: 'Heart Rate Chart' } });
            return (<LmcHeartRateChart
                type='heart_rate'
                yAxisLabel="Heat Rate (bpm)"
                title="Heart Rate (bpm) vs. Time"
                {...chartProps} />);
        default:
            const LmcBlankSlate = withToolbar(BlankState);
            return <LmcBlankSlate heading={'That\s not a report!'} style={styles.blankSlate} />;
        }
    }

    render() {
        const { dataFetch, params } = this.props;
        return (
            <div>
                { dataFetch.pending
                    ? <LmcLoadingScreen />
                    : dataFetch.fulfilled
                        ? this.renderChart(this.props)
                        : <div>
                            <div className="Toolbar"><BackButton params={params} /></div>
                            <BlankState heading={'Oops! Unable to load the chart'} style={styles.blankSlate} />
                        </div>}
            </div>
        );
    }
}

const styles = {
    blankSlate: {
        // marginTop: 40,
    }
}

LmcChart.propTypes = {

};

export default connect(({ params }) => ({
    dataFetch: `${Keystone.adminPath}/api/reports/charts/${params.chart_type}/${params.resident_id}`,
}))(LmcChart);
