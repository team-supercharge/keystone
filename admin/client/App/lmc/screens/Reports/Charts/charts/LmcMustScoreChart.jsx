import withToolbar from '../withToolbar.jsx';
import LmcLineChart from './LmcLineChart.jsx';

export default withToolbar(LmcLineChart, {
    pdfExport: {
        title: 'MUST Score',
    },
    timeWindow: 7 * 12,
    childProps: {
        yMax: 6,
        type: 'must',
        yAxisLabel: 'MUST Score',
        title: 'MUST Score Chart',
        subTitle: 'Malnutrition Universal Screening Tool',
    },
});
