import withToolbar from '../withToolbar.jsx';
import LmcLineChart from './LmcLineChart.jsx';
import moment from 'moment';

const moods = {
    1: 'Very Bad',
    2: 'Bad',
    3: 'Neutral',
    4: 'Good',
    5: 'Very Good',
};

export default withToolbar(LmcLineChart, {
    pdfExport: {
        title: 'Mood Chart',
    },
    timeWindow: 7 * 4,
    childProps: {
        type: 'mood',
        yMax: 5,
        yAllowDecimals: false,
        yAxisLabel: 'Mood Score',
        title: 'Mood Chart',
        subTitle: '1 = Very Bad, 2 = Bad, 3 = Neutral, 4 = Good, 5 = Very Good',
        tooltip: {
            formatter: function () {
                return `<strong style="font-size: 10px; opacity: 0.7;">${moment(this.x).format('dddd Do MMMM YYYY')}</strong><br /> Mood was <strong>${moods[this.y]}</strong>`;
            },
        },
    },
});
