import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class LmcTimelineRow extends Component {
    render() {
        const fallback = "https://cdn2.iconfinder.com/data/icons/business-office-14/256/5-128.png";
        const image = fallback // item || category || fallback
        const { index, total, log } = this.props;
        const isFirstOrLast = (index !== (total - 1));
        const timelineStyle = isFirstOrLast ? 
            { ...styles.logRow, ...styles.logRowBorder } :
            styles.logRow;

        return (
            <div style={styles.container}>
                <div style={timelineStyle}>
                    <div style={styles.dot}>
                        <img style={styles.iconStyle} src={image}/>
                    </div>

                    <div style={styles.logContent}>
                        <div style={styles.smallText}>
                            {moment(log.timeLogged).format('HH:mm')} - {log.carerName || 'Carer name'}
                        </div>
                        <h3 style={styles.titleText}>
                            {log.title}
                        </h3>
                        <div style={styles.descriptionText}>{log.description}</div>	
                    </div>
                </div>
            </div>
        )
    }
}

LmcTimelineRow.propTypes = {
    index: PropTypes.number.isRequired, 
    total: PropTypes.number.isRequired,
    log: PropTypes.object.isRequired,
};


const styles = {
    container: {
        paddingLeft: 18,
    },
    logContent: {
        position: 'relative',
        top: -25,
    },
    smallText: {
		color: '#7b7b7b',
		fontSize: 11,
	},
	titleText: {
		fontWeight: 400,
		fontSize: 20,
		marginBottom: 3,
		lineHeight: '18px',
	},
	descriptionText: {
		fontSize: 12,
		// marginLeft: 60,
		color: '#444444',
	},
    logRow: {
        position: 'relative',
        paddingLeft: 40,
        paddingBottom: 20,
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
        left: -22,
        top: -20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e4e4e4',
        alignItems: 'center',
    },
    iconStyle: {
        position: 'absolute',
        left: 10,
        top: 10,
        width: 20,
        height: 20
    }
};

export default LmcTimelineRow;
