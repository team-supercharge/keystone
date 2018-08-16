import withToolbar from '../withToolbar.jsx';
import LmcLineChart from './LmcLineChart.jsx';

export default withToolbar(LmcLineChart, {
    pdfExport: {
        title: 'Weight Chart',
    },
    timeWindow: 7 * 12,
    childProps: {
        title: 'Weight Chart',
        type: 'weight',
        yAxisLabel: 'Weight (kg)',
    },
});
