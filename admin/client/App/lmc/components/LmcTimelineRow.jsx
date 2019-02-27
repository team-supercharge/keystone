import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import LmcLink from './LmcLink.jsx';


class LmcTimelineRow extends Component {

    renderIconTimeline() {
        const { item } = this.props;
        const image = _.get(item, 'itemIcon.url')
            || _.get(item, 'categoryIcon.url')
            || 'https://cdn2.iconfinder.com/data/icons/business-office-14/256/5-128.png';

        const dotStyle = {
            ...styles.dot,
            backgroundColor: item.categoryColor,
        };
    
        return (
            <div style={dotStyle} className="lmc-timeline-dot">
                <div className="lmc-dot-icon" style={{ background: `url(${image})`, ...styles.iconStyle }} />
            </div>
        )
    }

    renderHeader() {
        const { item, dateFormat } = this.props;
        return (
            <div style={styles.smallText} className="lmc-timeline-date">
                { moment(item.timeLogged || item.date).format(dateFormat || 'HH:mm') } - {item.carerName || 'Carer name'}
                { item.witnessedBy
                    ? <span>
                        <span style={{ opacity: 0.7 }}>, witnessed by </span>{item.witnessedBy}
                    </span> : null }
            </div>
        )
    }

    renderFooter() {
        const { item } = this.props;
        if (!item.editedBy) return null;
        return (
            <span style={styles.revisionText}>
                Edited by { item.editedBy } on { moment(item.editedAt).format('DD/MM/YYYY') }
            </span> 
        )
    }

    renderContent() {
        const { item } = this.props;
        return (
            <div style={styles.content}>
                {this.renderHeader()}
                <h3 style={styles.titleText}>
                    {item.title}
                </h3>
                <div className="lmc-timeline-desc" style={styles.descriptionText}>
                    {item.description}
                </div>
                {this.renderFooter()}
            </div>
        )
    }

    render () {
        const {
            disabled,
            index,
            total,
            item,
        } = this.props;

        const isFirstOrLast = (index !== (total - 1));
        const timelineStyle = isFirstOrLast
            ? { ...styles.item, ...styles.itemBorder }
            : styles.item;

        const url = `${ Keystone.adminPath }/logs/${ item.id }`;

        return (
            <li key={item.id}>
                <LmcLink disabled={disabled} to={url} className="lmc-timeline-link">
                    <div style={styles.container}>
                        <div style={timelineStyle}>
                            {this.renderIconTimeline()}
                            {this.renderContent()}
                        </div>
                    </div>
                </LmcLink>
            </li>
        );
    }
}

LmcTimelineRow.propTypes = {
    index: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    total: PropTypes.number.isRequired,
};


const styles = {
    container: {
        paddingLeft: 20,
    },
    content: {
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
        color: '#444444',
    },
    revisionText: {
        fontSize: 11,
        opacity: 0.5,
        color: '#444444',
    },
    item: {
        position: 'relative',
        paddingLeft: 40,
        paddingBottom: 15,
        margin: '0',
        borderLeft: '4px solid rgba(0,0,0,0)', /* this is super hacky... */
    },
    itemBorder: {
        borderLeft: '4px solid #e4e4e4',
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
