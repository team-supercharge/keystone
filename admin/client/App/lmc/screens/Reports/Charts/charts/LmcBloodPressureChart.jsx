import withToolbar from '../withToolbar.jsx';
import LmcLineChart from './LmcLineChart.jsx';


export default withToolbar(LmcLineChart, {
    pdfExport: {
        title: 'Blood Pressure Chart',
    },
    timeWindow: 7 * 12,
    childProps: {
        title: 'Blood Pressure Chart',
        legendEnabled: true,
        series: [
            {
                type: 'blood_pressure_upper',
                label: 'Upper (Systolic)',
            },
            {
                type: 'blood_pressure_lower',
                label: 'Lower (Diastolic)',
            },
        ],
        type: 'must',
        yAxisLabel: 'Blood Pressure (mmHg)',
    },
});
