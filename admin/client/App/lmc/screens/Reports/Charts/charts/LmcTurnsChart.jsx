import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { BlankState } from '../../../../../elemental';
import { LmcChartLogList } from '../../../../components';
import withToolbar from '../withToolbar.jsx';


const icons = {
    left: {
        url: 'https://s3.eu-west-2.amazonaws.com/lmc-data-production/icons/left-arrow.png',
    },
    down: {
        url: 'https://s3.eu-west-2.amazonaws.com/lmc-data-production/icons/down-arrow.png',
    },
    right: {
        url: 'https://s3.eu-west-2.amazonaws.com/lmc-data-production/icons/right-arrow.png',
    },
    standing: {
        url: 'https://s3.eu-west-2.amazonaws.com/lmc-data-production/icons/standing_icon.png',
    },
    chair: {
        url: 'https://s3.eu-west-2.amazonaws.com/lmc-data-production/icons/chair_icon.png',
    },
    bed: {
        url: 'https://s3.eu-west-2.amazonaws.com/lmc-data-production/icons/bed_icon.png',
    },
};


class LmcTurnsChart extends Component {
    render () {
        const { logs } = this.props;

        const Logs = _.cloneDeep(logs) // because we're mutating them!
            .map(log => {

                if (log.description
                    && (log.description.match('to right')
                    || log.description.match('to his right')
                    || log.description.match('to her right'))
                ) {
                    log.itemIcon = icons.right;
                } else if (log.description
                    && (log.description.match('to left')
                    || log.description.match('to his left')
                    || log.description.match('to her left'))
                ) {
                    log.itemIcon = icons.left;
                } else if (log.description
                    && (log.description.match('to back')
                    || log.description.match('to his back')
                    || log.description.match('to her back'))
                ) {
                    log.itemIcon = icons.down;
                } else if (log.description
                    && (log.description.match('to chair')
                    || log.description.match('to his chair')
                    || log.description.match('to her chair'))
                ) {
                    log.itemIcon = icons.chair;
                } else if (log.description
                    && (log.description.match('to feet')
                    || log.description.match('to his feet')
                    || log.description.match('to her feet'))
                ) {
                    log.itemIcon = icons.standing;
                } else if (log.description
                    && (log.description.match('to bed')
                    || log.description.match('to his bed')
                    || log.description.match('to her bed'))
                ) {
                    log.itemIcon = icons.bed;
                }

                return log;
            });

        return (
            Logs && Logs.length
                ? <div>
                    <LmcChartLogList logs={Logs} />
                </div>
                : <BlankState heading={`No logs to display`} style={{ marginTop: 40 }} />
        );
    }
}

LmcTurnsChart.propTypes = {
    title: PropTypes.string.isRequired,
};


export default withToolbar(LmcTurnsChart, {
    pdfExport: {
        title: 'Turns Chart',
    },
    timeWindow: 7,
});
