import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
} from '../../../../elemental';
import { Link } from 'react-router';
import _ from 'lodash';
import moment from 'moment';

const Incident = (data, index) => {

    const picture = _.isString(_.get(data, 'fields.picture')) ?
        row.fields.picture
        : 'https://s3-eu-west-2.amazonaws.com/lmc-marketing-public/wp-content/uploads/2018/04/12092141/profile_pic_placeholder.png';
    console.log(data);
    return (
        <Link key={index}
            to={`${Keystone.adminPath}/logs/${data.id}`}
            style={{ width: '100%', float: 'left', margin: '0 1px 5px' }}>
            <img style={{ float: 'left'}} height='45' src={picture} alt=""/>
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
        <div key={i} style={{ width: '100%', paddingBottom: 8, }} >
            <img height='45' src="https://s3-eu-west-2.amazonaws.com/lmc-marketing-public/wp-content/uploads/2018/04/12092142/profile_row_placeholder.png" alt=""/>
        </div>
    )
}

class LmcIncidentsCard extends Component {

    renderNoIncidents() {
        return (
            <div>
                { [1,2,3].map(RowPlaceholder) }
            </div>
        );
    }

    renderIncidents(incidents) {
        // only show newest 3
        window._  = _;
        const toDisplay = _(incidents)
            .sort((left, right) => {
                return moment.utc(right.timeLogged).diff(moment.utc(left.timeLogged))
            })
            .take(3)
            .value();

        return (
            incidents.map(Incident)
        )
    }

    renderFooter(incidents) {
        return (
            <div className="lmc-card-footer">
                <p style={{ marginBottom: 0 }}>
                    { incidents ? incidents.length : 'No' } { incidents && incidents.length === 1 ? 'incident' : 'incidents' } today
                </p>
                <Link to={`${Keystone.adminPath}/logs`}>
                    <Button color="default">
                        <span style={{ opacity: 0.6 }}>
                            { BUTTON_TEXT }
                        </span>
                    </Button>
                </Link>
            </div>
        )
    }

    render() {
        const { logs } = this.props;
        let incidents;
        if (logs && logs.length) {
            incidents = logs.filter(log => log.category.match('Incident'));
        }

        return (
            <div>
                <h2 className="lmc-card-title">
                    { TITLE }
                </h2>
                <div className="lmc-card">
                    <div className="lmc-card-body">
                        { incidents && incidents.length ? 
                            this.renderIncidents(incidents) :
                            this.renderNoIncidents()
                        }
                    </div>
                    { this.renderFooter(incidents) }
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

};

const TITLE = 'Incidents';
const BUTTON_TEXT = 'View All Logs';

export default LmcIncidentsCard;