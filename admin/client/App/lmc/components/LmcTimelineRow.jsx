import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import LmcLink from './LmcLink.jsx';


class LmcTimelineRow extends Component {
    render () {
        const { mock, index, total, log, dateFormat } = this.props;
        const fallback = 'https://cdn2.iconfinder.com/data/icons/business-office-14/256/5-128.png';
        const image = _.get(log, 'itemIcon.url') || _.get(log, 'categoryIcon.url') || fallback;

        // let revision = log.revisions
        //     ? _.sortBy(log.revisions, d => Date.now() - new Date(d.revokedAt))[0]
        //     : null;
        // TODO: is this right? should we not use the revision data?

        const isFirstOrLast = (index !== (total - 1));
        const timelineStyle = isFirstOrLast
            ? { ...styles.logRow, ...styles.logRowBorder }
            : styles.logRow;
        const dotStyle = {
            ... styles.dot,
            backgroundColor: log.categoryColor,
        };
        return (
            <li key={log.id}>
                <LmcLink disabled={mock} to={`${ Keystone.adminPath }/logs/${ log.id }`} className="lmc-timeline-link">
                    <div style={styles.container}>
                        <div style={timelineStyle}>
                            <div style={dotStyle} className="lmc-timeline-dot">
                                <div className="lmc-dot-icon" style={{ background: `url(${image})`, ...styles.iconStyle }} />
                            </div>

                            <div style={styles.logContent}>
                                <div style={styles.smallText} className="lmc-timeline-date">
                                    { moment(log.timeLogged).format(dateFormat || 'HH:mm') } - {log.carerName || 'Carer name'}
                                    { log.witnessedBy
                                        ? <span>
                                            <span style={{ opacity: 0.7 }}>, witnessed by </span>{log.witnessedBy}
                                        </span> : null }
                                </div>
                                <h3 style={styles.titleText}>
                                    {log.title}
                                </h3>
                                <div className="lmc-timeline-desc" style={styles.descriptionText}>{log.description}</div>
                                { log.editedBy
                                    ? <span style={styles.revisionText}>
                                        Edited by { log.editedBy } on { moment(log.editedAt).format('DD/MM/YYYY') }
                                    </span> : null }
                            </div>
                        </div>
                    </div>
                </LmcLink>
            </li>
        );
    }
}

LmcTimelineRow.propTypes = {
    index: PropTypes.number.isRequired,
    log: PropTypes.object.isRequired,
    total: PropTypes.number.isRequired,
};


const styles = {
    container: {
        paddingLeft: 20,
    },
    logContent: {
        position: 'relative',
        top: -25,
    },
    smallText: {
        color: '#7b7b7b',
        fontSize: 11,
        opacity: 0.9,
    },
    titleText: {
        fontWeight: 400,
        fontSize: 16,
        marginBottom: 2,
        lineHeight: '16px',
    },
    descriptionText: {
        fontSize: 12,
		// marginLeft: 60,
        color: '#444444',
    },
    revisionText: {
        // paddingLeft: 15,
        fontSize: 11,
        opacity: 0.5,
		// marginLeft: 60,
        color: '#444444',
    },
    logRow: {
        position: 'relative',
        paddingLeft: 40,
        paddingBottom: 15,
        margin: '0',
        borderLeft: '4px solid rgba(0,0,0,0)', /* this is super hacky... */
    },
    logRowBorder: {
        borderLeft: '4px solid #e4e4e4',
    },
    logRowPadded: {
        paddingTop: 30,
    },
    dot: {
        position: 'absolute',
        left: -24,
        top: -21,
        width: 44,
        height: 44,
        border: '3px solid rgba(0,0,0,0)',
        borderRadius: 24,
        backgroundColor: '#e4e4e4',
        alignItems: 'center',
    },
    iconStyle: {
        backgroundSize: '14px !important',
        backgroundPosition: 'center center !important',
    },
};

export default LmcTimelineRow;
