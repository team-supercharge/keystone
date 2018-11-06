import {
    LmcLogTimeline,
} from '../../../../components';
import withToolbar from '../withToolbar.jsx';


export default withToolbar(LmcLogTimeline, {
    dateFilter: {
        left: true,
    },
    timeWindow: 7 * 4 * 6,
    disableMock: true,
    pdfExport: {
        title: 'Health Visits',
        headerDate: false,
        groupBy: 'date',
        dateFormat: 'HH:mm',
    },
});
