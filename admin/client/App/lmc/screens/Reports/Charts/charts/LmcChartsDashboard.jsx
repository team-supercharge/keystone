import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import moment from 'moment';
import LmcResidentLatestLogs from './LmcResidentLatestLogs.jsx';


const KeyFigureLink = ({ label, key, data, render, unit }, resident_id) => {
    const image = _.get(data, 'log.itemIcon.url') || _.get(data, 'log.categoryIcon.url') || fallback;
    const dotStyle = {
        ... styles.dot,
        backgroundColor: _.get(data, 'log.categoryColor') || '#f9f9f9',
    };

    let val = data.value && _.isNumber(data.value)
        ? parseFloat(data.value.toFixed(2))
        : data.value;

    return (
        <div key={key}>
            <Link to={`${Keystone.adminPath}/reports/charts/${key}/${resident_id}`}>
                <div style={styles.timelineContainer}>
                    <div style={dotStyle} className="lmc-timeline-dot">
                        <div className="lmc-dot-icon" style={{ background: `url(${image})`, ...styles.iconStyle }} />
                    </div>
                    <h4 style={styles.measurement}>
                        {data.label || label}: { render
                            ? render(data)
                            : val }{unit}
                    </h4>
                    <p style={styles.timestamp}>
                        Last Recorded: { moment(_.get(data, 'log.timeLogged')).format('HH:mm DD/MM/YY') }
                    </p>
                </div>
            </Link>
        </div>
    );
};


class LmcChartsDashboard extends React.Component {

    renderMeasurements (measurements_with_data, resident_id) {
        return (
            <div>
                <h2 className="lmc-card-title">
                    Charts
                </h2>
                <div style={styles.sectionContainer}>
                    { measurements_with_data.map(measurement => KeyFigureLink(measurement, resident_id)) }
                </div>
            </div>
        );
    }

    renderNoMeasurements (measurements_no_data, resident_id) {
        return (
            <div>
                <h2 className="lmc-card-title">
                    No Data
                </h2>
                <div style={styles.sectionContainer}>
                    { measurements_no_data.map(({ label, key }) => (
                        <Link key={key} to={`${Keystone.adminPath}/reports/charts/${key}/${resident_id}`}>
                            <h4 key={label}>
                                {label}
                            </h4>
                        </Link>
                    )) }
                </div>
            </div>
        );
    }

    render () {
        const { params, data, mock } = this.props;
        const measurements = _.sortBy([
            { label: 'Fluids', key: 'fluids', unit: 'ml last 24h' },
            { label: 'Food', key: 'meal', unit: ' portions last 24h' },
            { label: 'Blood Pressure', key: 'blood_pressure', unit: 'mmHg' },
            { label: 'Blood Oxygen', key: 'blood_oxygen', unit: '% SpO2' },
            { label: 'Heart Rate', key: 'heart_rate', unit: 'bpm' },
            { label: 'MUST', key: 'must' },
            { label: 'Temperature', key: 'temperature', unit: 'C' },
            { label: 'Turns', key: 'turns', unit: ' in last 24h' },
            { label: 'Waterlow', key: 'waterlow' },
            { label: 'Weight', key: 'weight', unit: 'kg' },
            {
                label: 'Stool',
                key: 'stool', render: d => {
                    return (!_.isNumber(d.value))
                        ? d.value || 'Normal'
                        : `Type ${d.value}`;
                },
            },
            {
                label: 'Mood',
                key: 'mood',
                render: (d) => {
                    const moods = {
                        1: 'Very Bad',
                        2: 'Bad',
                        3: 'Neutral',
                        4: 'Good',
                        5: 'Very Good',
                    };
                    return moods[d.value] || d.value;
                },
            },
            {
                label: 'Mobility',
                key: 'mobility',
                render: (d) => {
                    const values = {
                        1: 'Very Poor',
                        2: 'Poor',
                        3: 'Neutral',
                        4: 'Good',
                        5: 'Very Good',
                    };
                    return values[d.value] || d.value;
                },
            },
        ], 'label');

        measurements.forEach(d => {
            d.data = _.find(data, { key: d.key });
        }); 

        const measurements_with_data = _.filter(measurements, 'data');
        const measurements_no_data = _.filter(measurements, d => !d.data);

        return (
            <div className="row">
                <div className="eight columns">
                    <div style={styles.sectionContainer}>
                        <LmcResidentLatestLogs mock={mock} resident_id={params.resident_id} />
                    </div>
                </div>
                <div className="four columns">
                    { measurements_with_data.length ? this.renderMeasurements(measurements_with_data, params.resident_id) : null }
                    { measurements_no_data.length ? this.renderNoMeasurements(measurements_no_data, params.resident_id) : null }
                </div>
            </div>
        );
    }
}

const fallback = 'https://cdn2.iconfinder.com/data/icons/business-office-14/256/5-128.png';
const styles = {
    timelineContainer: {
        position: 'relative',
        paddingLeft: 52,
        paddingBottom: 10,
        margin: '0',
    },
    measurement: {
        marginBottom: 3,
    },
    timestamp: {
        marginTop: 0,
        opacity: 0.5,
        fontSize: 11,
        color: '#000',
    },
    sectionContainer: {
        paddingTop: 0,
        paddingBottom: 20,
    },
    link: {

    },
    dot: {
        position: 'absolute',
        top: -7,
        left: 0,
        width: 44,
        height: 44,
        border: '3px solid rgba(0,0,0,0)',
        borderRadius: 24,
        backgroundColor: '#e4e4e4',
        alignItems: 'center',
    },
    iconStyle: {
        backgroundSize: '12px !important',
        backgroundPosition: 'center center !important',
    },
};

export default LmcChartsDashboard;
