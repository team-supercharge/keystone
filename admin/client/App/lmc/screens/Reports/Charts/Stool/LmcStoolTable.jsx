import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router';

import {
    StoolColormap,
    isStoolBloody,
    isStoolMucus,
    isStoolOffensive,
    getStoolColor,
} from '../../../../common/utils';


const StoolMark = (color) => {
    return (
        <td style={{ backgroundColor: color, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
            <img style={{ width: 13, left: -1, position: 'relative' }} src="https://s3.eu-west-2.amazonaws.com/lmc-data-production/icons/icon-tick.png" alt="tick" />
        </td>
    )
}

class LmcStoolTable extends Component {
    render() {
        const { logs, resident } = this.props;
        const types = [1, 2, 3, 4, 5, 6, 7];
        const logsSorted = _.sortBy(logs, ({ timeLogged }) => -moment(timeLogged));
        return (
            <div style={{ padding: '50px 10px' }}>
                <table className="Table ItemList">
                    <thead className="lmc-table-center-text">
                        <tr className="lmc-table-header">
                            <th>Date</th>
                            <th colSpan="7" style={{ width: 200, textAlign: 'center' }}>Bristol Type</th>
                            <th>Blood</th>
                            <th>Mucus</th>
                            <th>Offensive</th>
                            <th>Color</th>
                            {/* <th style={{ width: 300 }}>Description</th> */}
                            <th>Carer</th>
                        </tr>
                        <tr className="lmc-table-subheader">
                            <th></th>
                            {types.map(d => <th key={d}>{d}</th>)}
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            {/* <th>y/n</th> */}
                            {/* <th></th> */}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { logsSorted.map(log => {
                            // if anyone sees this, feel free to shout at Sam or Adam.
                            // (form data => string => regex => form data) === shame
                            const type = _.get(log, 'measurements.stool.value');
                            const isBloody = isStoolBloody(log.description);
                            const isMucus = isStoolMucus(log.description);
                            const isOffensive = isStoolOffensive(log.description);
                            const stoolColor = getStoolColor(log.description);

                            return (
                                <tr>
                                    <td style={{ paddingRight: 3 }}>
                                        <Link className="lmc-dark-link" to={`${Keystone.adminPath}/logs/${log.id}`}>
                                            {moment(log.timeLogged).format('HH:mm DD/MM/YY')}
                                        </Link>
                                    </td>
                                    {types.map(t => (
                                        type === t ? StoolMark(StoolColormap[t]) : <td />
                                    ))}
                                    { isBloody ? StoolMark('#c5c5c5') : <td /> }
                                    { isMucus ? StoolMark('#c5c5c5') : <td /> }
                                    { isOffensive ? StoolMark('#c5c5c5') : <td /> }
                                    <td style={{ textAlign: 'center', textTransform: 'capitalize' }}>
                                        { stoolColor }
                                    </td>
                                    {/* <td>{log.description}</td> */}
                                    <td>{log.carerName}</td>
                                </tr>
                            );
                        })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

LmcStoolTable.propTypes = {
    logs: PropTypes.array.isRequired,
};

export default LmcStoolTable;
