import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { BlankState } from '../../../../../elemental';
import { LmcChartLogList } from '../../../../components';
import { images } from '../../../../common/constants';
import withToolbar from '../withToolbar.jsx';

/**
 * This component adds custom icons to each log to
 * indicate which direction the resident was turned
 */

const icons = {
    left: { url: images.icon_arrow_left },
    down: { url: images.icon_arrow_down },
    right: { url: images.icon_arrow_right },
    standing: { url: images.icon_standing },
    chair: { url: images.icon_chair },
    bed: { url: images.icon_bed },
};

const matches = (desc, patterns) => {
    return desc && _.some(patterns, p => desc.match(p))
};

class LmcTurnsChart extends Component {
    render () {
        const { logs } = this.props;

        const Logs = _.cloneDeep(logs) // because we're mutating them!
            .map(log => {
                if (matches(log.description, ['to right', 'to his right', 'to her right'])) {
                    log.itemIcon = icons.right;
                } else if (matches(log.description, ['to left', 'to his left', 'to her left'])) {
                    log.itemIcon = icons.left;
                } else if (matches(log.description, ['to back', 'to his back', 'to her back'])) {
                    log.itemIcon = icons.down;
                } else if (matches(log.description, ['to chair', 'to his chair', 'to her chair'])) {
                    log.itemIcon = icons.chair;
                } else if (matches(log.description, ['to feet', 'to his feet', 'to her feet'])) {
                    log.itemIcon = icons.standing;
                } else if (matches(log.description, ['to bed', 'to his bed', 'to her bed'])) {
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
};

LmcTurnsChart.propTypes = {
    title: PropTypes.string.isRequired,
};


export default withToolbar(LmcTurnsChart, {
    pdfExport: {
        title: 'Turns Chart',
    },
    timeWindow: 7,
});
