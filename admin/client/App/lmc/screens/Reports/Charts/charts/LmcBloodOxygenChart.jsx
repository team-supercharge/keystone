import withToolbar from '../withToolbar.jsx';
import LmcLineChart from './LmcLineChart.jsx';


export default withToolbar(LmcLineChart, {
    pdfExport: {
        title: 'Blood Oxygen Chart',
    },
    childProps: {
        type: 'blood_oxygen',
        yAxisLabel: 'Blood Oxygen Saturation (mmHg)',
        title: 'Blood Oxygen Chart',
    },
});
