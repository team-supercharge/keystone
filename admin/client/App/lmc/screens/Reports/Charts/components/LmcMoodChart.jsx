import withToolbar from '../withToolbar.jsx';
import LmcLineChart from './LmcLineChart.jsx';

export default withToolbar(LmcLineChart, {
    pdfExport: {
        title: 'Mood Chart',
    },
    childProps: {
        type: 'mood',
        yAxisLabel: 'Mood Score',
        title: 'Mood Chart',
        subTitle: '1 = Very Bad, 2 = Bad, 3 = Neutral, 4 = Good, 5 = Very Good',
    },
});
