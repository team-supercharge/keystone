import {
    LmcLogTimeline,
} from '../../../../components';
import withToolbar from '../withToolbar.jsx';


export default withToolbar(LmcLogTimeline, {
    dateFilter: {
        left: true,
    },
    disableMock: true,
    timeWindow: 7 * 4,
    pdfExport: {
        title: 'Activities & Social',
        headerDate: false,
        groupBy: 'date',
        dateFormat: 'HH:mm',
    },
});
