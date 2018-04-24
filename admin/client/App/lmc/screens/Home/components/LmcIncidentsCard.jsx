import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
} from '../../../../elemental';
import { Link } from 'react-router';
import _ from 'lodash';
import moment from 'moment';


const Incident = (data, index) => {
    const picture = data.picture || PROFILE_PLACEHOLDER;

    return (
        <Link key={index}
            to={`${ Keystone.adminPath }/logs/${ data.id }`}
            style={{ width: '100%', float: 'left', margin: '0 1px 5px' }}>
            <div style={{ float: 'left' }} >
            <div className="lmc-profile-picture" style={{ background: `url(${picture})` }}></div>
            </div>
            <p style={{ padding: '0 0 0 55px', color: 'black' }}>
                <span style={{ opacity: 0.8, fontSize: 16 }}>{ data.residentName }</span> <br />
                <span style={{ opacity: 0.6, fontSize: 12 }}>
                    { data.item.split('/')[1] } @ { moment(data.timeLogged).format('HH:mm') }
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
        // only show newest 3
        const toDisplay = _(incidents)
            .sort((left, right) => {
                return moment.utc(right.timeLogged).diff(moment.utc(left.timeLogged));
            })
            .take(3)
            .map(incident => {
                let resident = _.find(residents, 'id', incident.residentId);
                if (resident && resident.picture) incident.picture = resident.picture;
                return incident;
            })
            .value();

        return (
            incidents.map(Incident)
        )
    }

    renderFooter(incidents, categoryId) {
        let url = `${Keystone.adminPath}/logs`;

        if (categoryId) {
            url += encodeURI(`?filters=[{"path":"category","inverted":false,"value":["${categoryId}"]}]`);
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