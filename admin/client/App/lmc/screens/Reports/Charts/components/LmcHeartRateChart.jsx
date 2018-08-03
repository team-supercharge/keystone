import withToolbar from '../withToolbar.jsx';
import LmcLineChart from './LmcLineChart.jsx';


export default withToolbar(LmcLineChart, {
    pdfExport: {
        title: 'Heart Rate Chart',
    },
    childProps: {
        type: 'heart_rate',
        yAxisLabel: 'Heat Rate (bpm)',
        title: 'Heart Rate Chart',
    },
});
