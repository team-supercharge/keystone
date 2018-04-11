import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
} from '../../../../elemental';
import { Link } from 'react-router';

const Incident = (data) => {
    return (
        <span>
            { data.residentName } <br />
            { data.timeLogged } <br />
            { data.item }
        </span>
    )
}

class LmcIncidentsCard extends Component {

    renderNoIncidents() {
        return (
            <span></span>
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
                    Incidents
                </h2>
                <div className="lmc-card">
                    <div className="lmc-card-body">
                        { incidents && incidents.length ? 
                            incidents.map(Incident) :
                            this.renderNoIncidents()
                        }
                    </div>
                    <div className="lmc-card-footer">
                        <p style={{ marginBottom: 0 }}> { incidents ? incidents.length : 0 } incidents reported today</p>
                        <Link to={`${Keystone.adminPath}/logs`}>
                            <Button color="default">
                                <span style={{ opacity: 0.6 }}>View All Logs</span>
                            </Button>
                        </Link>
                    </div>
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

export default LmcIncidentsCard;