import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import moment from 'moment';
import LmcResidentLatestLogs from './LmcResidentLatestLogs.jsx';

const KeyFigureLink = (resident_id, data, { label, key }) => {
    const d = _.get(data, `results.${key}`);
    const image = _.get(d, 'log.itemIcon.url') || _.get(d, 'log.categoryIcon.url') || fallback;
    const dotStyle = {
        ... styles.dot,
        backgroundColor:  _.get(d, 'log.categoryColor') || '#f9f9f9',
    }

    return (
        <div key={key}>
            <Link to={`${Keystone.adminPath}/reports/charts/${key}/${resident_id}`}>
                <div style={styles.timelineContainer}>
                    <div style={dotStyle} className="lmc-timeline-dot">
                        <div className="lmc-dot-icon" style={{ background: `url(${image})`, ...styles.iconStyle }} />
                    </div>
                    <h4 style={styles.measurement}>
                        {d.label || label}: {d.value}
                    </h4>
                    <p style={styles.timestamp}>
                        Last Recorded: { moment(d.log.timeLogged).format('HH:mm DD/MM/YY') }
                    </p>
                </div>
            </Link>
        </div>
    )
}

const KeyFigureEmptyLink = (resident_id, { label, key }) => {
    return (
        <div>
            <Link to={`${Keystone.adminPath}/reports/charts/${key}/${resident_id}`}>
                <h4>
                    {label}
                </h4>
            </Link>
        </div>
    )
}

const fallback = 'https://cdn2.iconfinder.com/data/icons/business-office-14/256/5-128.png';

class LmcChartsDashboard extends React.Component {

    renderMeasurements(measurements_with_data, params, data) {
        return (
            <div>
                <h2 className="lmc-card-title">
                    Charts
                </h2>
                <div style={styles.sectionContainer}>
                    { measurements_with_data.map(measurement => KeyFigureLink(params.resident_id, data, measurement)) }
                </div>
            </div>
        )
    }

    renderNoMeasurements(measurements_no_data, params) {
        return (
            <div>
                <h2 className="lmc-card-title">
                    No Data
                </h2>
                <div style={styles.sectionContainer}>
                    { measurements_no_data.map(measurement => KeyFigureEmptyLink(params.resident_id, measurement)) }
                </div>
            </div>
        )
    }

    render () {
        const { params, dataFetch: { value: data } } = this.props;
        // const measurements = [
        //     { label: 'Blood Oxygen (mmHg)', key: 'blood_oxygen' },
        //     { label: 'MUST', key: 'must' },
        //     { label: 'Food', key: 'food' },
        //     // { label: 'Height', key: 'height' },
        //     { label: 'Heart Rate (bpm)', key: 'heart_rate' },
        //     { label: 'Mood', key: 'mood' },
        //     { label: 'Stool', key: 'stool' },
        //     { label: 'Temperature', key: 'temperature' },
        //     { label: 'Turns', key: 'turns' },
        //     { label: 'Waterlow', key: 'waterlow' },
        //     { label: 'Weight', key: 'weight' },
        // ];

        /*
        Ideal Data Model:

        {
            // aggregate
            fluids: {
                value: 123,
                log: {} (for the icon / timestamp)
            },
            blood_pressure: {
                value: 123,
                log: {} (for the icon / timestamp)
            }

            // plain
            mood: {
                value: 1,
                log: {}
            }
        }


        Key points to

        Plain:
        Blood Oxygen
        Heart Rate
        MUST
        Stool
        Temperature
        Waterlow
        Weight

        Custom
        Blood Pressure
        Mood (needs legend)
        Food - last 24h
        Fluids - last 24h
        Food
            - Last 24h
            - No meal type?
        Turns? turns in last 24h?
        */

        const measurements = _.sortBy([
            { label: 'Fluids', label_data: 'Fluids last 24h (ml)', key: 'fluids' },
            { label: 'Food Consumption', key: 'meal' },
            { label: 'Blood Pressure (mm Hg)', key: 'blood_pressure' },
            { label: 'Blood Oxygen (% SpO2)', key: 'blood_oxygen' },
            { label: 'Heart Rate (bpm)', key: 'heart_rate' },
            { label: 'Mood', key: 'mood' },
            { label: 'MUST', key: 'must' },
            { label: 'Stool', key: 'stool' },
            { label: 'Temperature', key: 'temperature' },
            { label: 'Turns', key: 'turns' },
            { label: 'Waterlow', key: 'waterlow' },
            { label: 'Weight', key: 'weight' },
        ], 'label');

        const hasData = ({ key }) => _.get(data, `results.${key}`);
        const measurements_with_data = measurements.filter(hasData);
        const measurements_no_data = measurements.filter(d => !hasData(d));

        return (
            <div className="row">
                <div className="eight columns">
                    <div style={styles.sectionContainer}>
                        <LmcResidentLatestLogs resident_id={params.resident_id} />
                        {/* <Link to={`${Keystone.adminPath}/reports/charts/daily/${params.resident_id}`} style={styles.link}>
                            Daily
                        </Link> */}
                    </div>
                    
                </div>
                <div className="four columns">
                    { measurements_with_data.length ? this.renderMeasurements(measurements_with_data, params, data) : null }
                    { measurements_no_data.length ? this.renderNoMeasurements(measurements_no_data, params) : null }
                </div>
            </div>
        );
    }
}

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
    }
}

export default LmcChartsDashboard;
