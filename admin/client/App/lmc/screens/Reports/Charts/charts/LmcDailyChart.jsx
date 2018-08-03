import {
    LmcLogTimeline,
} from '../../../../components';
import withToolbar from '../withToolbar.jsx';


export default withToolbar(LmcLogTimeline, {
    dateFilter: {
        left: true,
    },
    pdfExport: {
        title: 'Daily Report',
        headerDate: false,
        groupBy: 'date',
        dateFormat: 'HH:mm',
    },
});
