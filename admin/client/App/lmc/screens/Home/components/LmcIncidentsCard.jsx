import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
} from '../../../../elemental';
import { Link } from 'react-router';
import _ from 'lodash';
import moment from 'moment';


const Incident = (data, index) => {
    // const picture = data.picture || PROFILE_PLACEHOLDER;
    const picture = _.get(data, 'itemIcon.url') || _.get(data, 'categoryIcon.url');
    const dotStyle = {
        ...styles.dot,
        backgroundColor: data.categoryColor,
    };
    return (
        <Link key={index}
            to={`${ Keystone.adminPath }/logs/${ data.id }`}
            style={{ width: '100%', float: 'left', margin: '0 1px 5px' }}>
            <div style={{ float: 'left' }} >
                <div style={dotStyle} className="lmc-timeline-dot">
                    <div className="lmc-dot-icon" style={{ background: `url(${picture})`, ...styles.iconStyle }} />
                </div>
            </div>
            <p style={{ padding: '0 0 0 55px', color: 'black' }}>
                <span style={{ opacity: 0.8, fontSize: 16 }}>{ data.title }</span> <br />
                <span style={{ opacity: 0.6, fontSize: 12 }}>
                    { moment(data.timeLogged).format('HH:mm') } - { data.residentName }
                </span>
            </p>
        </Link>
    )
}

const RowPlaceholder = (i) => {
    return (
        <div key={i} style={{ width: '100%', paddingBottom: 8 }} >
            <img height="45" src={ROW_PLACEHOLDER} alt=""/>
        </div>
    )
}

class LmcIncidentsCard extends Component {

    renderNoIncidents() {
        return (
            <div>
                { [1, 2, 3].map(RowPlaceholder) }
            </div>
        );
    }

    renderIncidents(incidents, residents) {
        return _(incidents)
            .sort((left, right) => moment.utc(right.timeLogged).diff(moment.utc(left.timeLogged)))
            .take(3) // only show newest 3
            .value()
            .map(Incident);
    }

    renderFooter(incidents, categoryId) {
        let url = `${Keystone.adminPath}/logs`;

        if (categoryId) {
            const filters = [
                {
                    path: 'category',
                    inverted: false,
                    value: [categoryId],
                },
                {
                    path: 'timeLogged',
                    mode: 'on',
                    value: moment().startOf('day').toISOString(),
                    before: moment().startOf('day').toISOString(),
                    after: moment().startOf('day').toISOString(),
                },
            ];
            url += encodeURI(`?filters=${JSON.stringify(filters)}`);
        }

        return (
            <div className="lmc-card-footer">
                <div className="lmc-flex-container">
                    <p>
                        { incidents ? incidents.length : 'No' } { incidents && incidents.length === 1 ? 'incident' : 'incidents' } today
                    </p>
                    <Link to={url}>
                        <Button color="default">
                            <span style={{ opacity: 0.6 }}>
                                { BUTTON_TEXT }
                            </span>
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    render() {
        const { logs, residents, categories, home } = this.props;
        const homeGroup = _.get(home, '0.group');
        let incidents;
        let categoryId = _.chain(categories)
            .filter(cat => cat.fields.group === homeGroup) // need to filter by home.group
            .find(cat => cat.name && cat.name.match('Incident'))
            .get('id')
            .value();

        if (logs && logs.length) {
            incidents = _.filter(logs, { categoryId });
        }

        return (
            <div>
                <h2 className="lmc-card-title">
                    { TITLE }
                </h2>
                <div className="lmc-card">
                    <div className="lmc-card-body">
                        { incidents && incidents.length ? 
                            this.renderIncidents(incidents, residents) :
                            this.renderNoIncidents()
                        }
                    </div>
                    { this.renderFooter(incidents, categoryId) }
                </div>
            </div>
        );
    }
}

const styles = {
    title: {
        opacity: 0.8,
    },
    dot: {
        left: -20,
        top: -18,
        width: 42,
        height: 42,
        border: '3px solid rgba(0,0,0,0)',
        borderRadius: 24,
        backgroundColor: '#e4e4e4',
        alignItems: 'center',
    },
    iconStyle: {
        backgroundSize: '14px !important',
        backgroundPosition: 'center center !important',
    }
}

LmcIncidentsCard.propTypes = {
    logs: PropTypes.array,
    residents: PropTypes.array,
};


const PROFILE_PLACEHOLDER = 'https://s3-eu-west-2.amazonaws.com/lmc-marketing-public/wp-content/uploads/2018/04/12092141/profile_pic_placeholder.png';
const ROW_PLACEHOLDER = 'https://s3-eu-west-2.amazonaws.com/lmc-marketing-public/wp-content/uploads/2018/04/12092142/profile_row_placeholder.png';
const TITLE = 'Incidents';
const BUTTON_TEXT = 'View All';

export default LmcIncidentsCard;