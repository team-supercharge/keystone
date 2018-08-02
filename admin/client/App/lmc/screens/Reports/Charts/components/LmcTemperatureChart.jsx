import withToolbar from '../withToolbar.jsx';
import LmcLineChart from './LmcLineChart.jsx';

export default withToolbar(LmcLineChart, {
    pdfExport: {
        title: 'Temperature Chart',
    },
    childProps: {
        type: 'temperature',
        yAxisLabel: 'Temperature (C)',
        title: 'Temperature Chart',
    },
});
