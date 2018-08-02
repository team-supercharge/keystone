import React, { Component } from 'react';
import { Link } from 'react-router';
import { BlankState, GlyphButton } from '../../../../elemental';
import withDataLoader from './withDataLoader.jsx';


import {
    LmcFoodChart,
    LmcFluidsChart,
    LmcTurnsChart,
    LmcStoolChart,
    LmcLineChart,
    LmcChartsDashboard,
} from './components/index.js';

import {
    LmcLogTimeline,
} from '../../../components';

import withToolbar from './withToolbar.jsx';
// import withDataLoader from './withDataLoader.jsx';


const BackButton = ({ params }) => {
    return (<GlyphButton
        component={Link}
        glyph="chevron-left"
        position="left"
        to={`${Keystone.adminPath}/reports/charts/dashboard/${params.resident_id}`}
        variant="link">
        Dashboard
    </GlyphButton>);
};


class LmcChart extends Component {
    renderChart (props) {
        /**
         * ToDo - Refactor: pull out all config into plain JSON?
         * There's too much repetition
         */

        const chartProps = {
            resident: props.resident,
            params: props.params,
            data: props.data,
        };

        switch (props.params.chart_type) {

        case 'fluids':
            const LmcFluid = withToolbar(LmcFluidsChart, { pdfExport: { title: 'Fluids Charts' } });
            return (<LmcFluid
                type="fluids"
                yAxisLabel="Fluids In / Out (ml)"
                title="Fluids Chart"
                {...chartProps} />);
        case 'must':
            const LmcMustChart = withToolbar(LmcLineChart, { pdfExport: { title: 'MUST Score' } });
            return (<LmcMustChart
                type="must"
                yMax={5}
                yAxisLabel="MUST Score"
                title="MUST Score Chart"
                subTitle="Malnutrition Universal Screening Tool"
                {...chartProps} />);
        case 'stool':
            const LmcStool = withToolbar(LmcStoolChart, { pdfExport: { type: 'stool', title: 'Bristol Stool Chart' } });
            return (<LmcStool
                type="stool"
                yAxisLabel="Number of bowel movements"
                title="Stool Chart"
                subTitle="Bristol Stool Scale"
                {...chartProps} />);
        case 'turns':
            const LmcTurns = withToolbar(LmcTurnsChart, { pdfExport: { title: 'Turns' } });
            return (<LmcTurns
                type="turns"
                filterPadding={1}
                yAxisLabel="Turns"
                title="Turns Chart"
                subTitle="Malnutrition Universal Screening Tool"
                {...chartProps} />);
        case 'temperature':
            const LmcTempChart = withToolbar(LmcLineChart, { pdfExport: { title: 'Temperature' } });
            return (<LmcTempChart
                type="temperature"
                yMin={30}
                yAxisLabel="Temperature (C)"
                title="Temperature Chart"
                {...chartProps} />);
        case 'mood':
            const LmcMoodChart = withToolbar(LmcLineChart, { pdfExport: { title: 'Mood' } });
            return (<LmcMoodChart
                type="mood"
                yMax={5}
                yAxisLabel="Mood"
                title="Mood Chart"
                subTitle="1 = Very Bad, 2 = Bad, 3 = Neutral, 4 = Good, 5 = Very Good"
                {...chartProps} />);
        case 'weight':
            const LmcWeightChart = withToolbar(LmcLineChart, { pdfExport: { title: 'Weight Chart' } });
            return (<LmcWeightChart
                type="weight"
                yAxisLabel="Weight (kg)"
                title="Weigh Chart"
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
                title="Blood Pressure Chart"
                {...chartProps} />);
        case 'waterlow':
            const LmcWaterlowChart = withToolbar(LmcLineChart, { pdfExport: { title: 'Waterlow Score' } });
            return (<LmcWaterlowChart
                type="waterlow"
                yAxisLabel="Waterlow Score"
                title="Waterlow Score Chart"
                {...chartProps} />);
        case 'blood_oxygen':
            const LmcOxygenChart = withToolbar(LmcLineChart, { pdfExport: { title: 'Blood Oxygen Chart' } });
            return (<LmcOxygenChart
                type="blood_oxygen"
                yAxisLabel="Blood Oxygen Saturation (mmHg)"
                title="Blood Oxygen Chart"
                {...chartProps} />);
        case 'heart_rate':
            const LmcHeartRateChart = withToolbar(LmcLineChart, { pdfExport: { title: 'Heart Rate Chart' } });
            return <LmcHeartRateChart type="heart_rate" yAxisLabel="Heat Rate (bpm)" title="Heart Rate Chart" {...chartProps} />;
        default:
            const LmcBlankSlate = withToolbar(BlankState);
            return <LmcBlankSlate heading={'That\s not a report!'} style={styles.blankSlate} />;
        }
    }

    render () {
        const { data, params } = this.props;

        if (data) return this.renderChart(this.props);

        return (
            <div>
                <div className="Toolbar"><BackButton params={params} /></div>
                <BlankState heading={'Oops! Couldn\'t load the chart'} style={styles.blankSlate} />
            </div>
        );
    }
}

const styles = {
    blankSlate: {
        // marginTop: 40,
    },
};

LmcChart.propTypes = {

};


export default withDataLoader(LmcChart, {
    url: ({ params }) => `${Keystone.adminPath}/api/reports/charts/${params.chart_type}/${params.resident_id}`,
    errorMessage: 'No logs to show',
    enableMockData: true,
});

