import withToolbar from '../withToolbar.jsx';
import LmcLineChart from './LmcLineChart.jsx';

export default withToolbar(LmcLineChart, {
    pdfExport: {
        title: 'Temperature Chart',
    },
    timeWindow: 1,
    childProps: {
        type: 'temperature',
        yMin: 7 * 4,
        yAxisLabel: 'Temperature (C)',
        title: 'Temperature Chart',
    },
});
