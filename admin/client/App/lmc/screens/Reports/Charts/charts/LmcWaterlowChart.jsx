import withToolbar from '../withToolbar.jsx';
import LmcLineChart from './LmcLineChart.jsx';

export default withToolbar(LmcLineChart, {
    pdfExport: {
        title: 'Waterlow Score',
    },
    childProps: {
        title: 'Waterlow Score Chart',
        type: 'waterlow',
        yAxisLabel: 'Waterlow Score',
    },
});
