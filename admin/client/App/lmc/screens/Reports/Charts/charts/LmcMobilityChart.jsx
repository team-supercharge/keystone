import withToolbar from '../withToolbar.jsx';
import LmcLineChart from './LmcLineChart.jsx';
import moment from 'moment';

const mobilityKey = {
    1: 'Very Poor',
    2: 'Poor',
    3: 'Average',
    4: 'Good',
    5: 'Very Good',
};

export default withToolbar(LmcLineChart, {
    pdfExport: {
        title: 'Mobility Chart',
    },
    timeWindow: 7 * 4,
    childProps: {
        type: 'mobility',
        yMax: 5,
        yAllowDecimals: false,
        yAxisLabel: 'Mobility Score',
        title: 'Mobility Chart',
        subTitle: '1 = Very Poor, 2 = Poor, 3 = Average, 4 = Good, 5 = Very Good',
        tooltip: {
            formatter: function () {
                return `
                    <strong style="font-size: 10px; opacity: 0.7;">
                        ${moment(this.x).format('dddd Do MMMM YYYY')}
                    </strong>
                    <br />
                    Mobility was <strong>${mobilityKey[this.y]}</strong>`;
            },
        },
    },
});
