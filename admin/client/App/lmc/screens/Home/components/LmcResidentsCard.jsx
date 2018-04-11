import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
    Button,
	GlyphButton,
	ResponsiveText,
} from '../../../../elemental';
import { Link } from 'react-router';


class LmcResidentsCard extends Component {
    render() {
        const { residents, home } = this.props;

        let activeResidents;
        if (residents && residents.length) {
            activeResidents = _.filter(residents, res => res.fields.status === 'active');
        }

        const onClick = () => {
            this.props.onCreate('Resident');
        }

        return (
            <div>
                <h2 className="lmc-card-title">
                    Residents
                </h2>
                <div className="lmc-card">
                    
                    <div className="lmc-card-body">
                        { 
                            activeResidents && activeResidents.length ? 
                                <div>
                                    <h4>
                                        {
                                            home && home.name ?
                                                <span>{ home.name } has { activeResidents.length } active residents</span>:
                                                <span>loading..</span>
                                        }
                                    </h4>
                                </div> :
                                <div>There are no active residents.</div>
                        }
                    </div>
                    <div className="lmc-card-footer">
                        <div style={{maxWidth: 160}}>
                            <GlyphButton
                                block
                                color="success"
                                glyph="plus"
                                onClick={onClick}
                                position="left"
                                title={`Create Resident`}
                            >
                                <ResponsiveText
                                    visibleSM="Create"
                                    visibleMD="Create"
                                    visibleLG={`Create Resident`}
                                />
                            </GlyphButton>
                        </div>
                        <div style={{ maxWidth: 95 }}>
                            <Link to={`${Keystone.adminPath}/residents`}>
                                <Button color="default">
                                    <span style={{ opacity: 0.6 }}>View All</span>
                                </Button>
                            </Link>
                        </div>
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

LmcResidentsCard.propTypes = {

};

export default LmcResidentsCard;