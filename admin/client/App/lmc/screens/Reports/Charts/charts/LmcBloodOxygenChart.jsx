import withToolbar from '../withToolbar.jsx';
import LmcLineChart from './LmcLineChart.jsx';


export default withToolbar(LmcLineChart, {
    pdfExport: {
        title: 'Blood Oxygen Chart',
    },
    timeWindow: 7 * 12,
    childProps: {
        yMin: 50,
        type: 'blood_oxygen',
        yAxisLabel: 'Blood Oxygen Saturation (% SpO2)',
        title: 'Blood Oxygen Chart',
    },
});
