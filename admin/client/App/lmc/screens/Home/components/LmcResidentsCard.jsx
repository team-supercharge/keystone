import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
    Button,
	GlyphButton,
	ResponsiveText,
} from '../../../../elemental';
import { Link } from 'react-router';


const RowPlaceholder = (row, index) => {
    const picture = row.picture || 'https://s3-eu-west-2.amazonaws.com/lmc-marketing-public/wp-content/uploads/2018/04/12092141/profile_pic_placeholder.png';

    return (
        <Link key={index}
            to={`${Keystone.adminPath}/residents/${row.id}`}
            style={{ width: 50, float: 'left', margin: '0 1px 5px' }}>
            <img height='45' src={picture} alt="" style={{ borderRadius: 50 }}/>
        </Link>
    )
}


class LmcResidentsCard extends Component {

    renderResidents(activeResidents, home) {
        return (
            <div>
                <p>
                    { home && home.name ?
                            <span>{ home.name } has </span>:
                            "There are "
                    }
                    <strong>{ activeResidents.length } active residents</strong>
                </p>
                { _.take(activeResidents, MAX_RESIDENTS_DISPLAYED)
                    .map(RowPlaceholder) }
            </div>
        )
    }

    renderNoResidents() {
        return (
            <div>
                <p>
                    { NO_RESIDENTS_INFO }
                </p>
            </div>
        )
    }

    renderNoActiveResidents(home) {
        return (
            <div>
                <p>
                    { home && home.name ?
                        <span>{ home.name } has </span>:
                        "There are "
                    }
                    no active residents.
                </p>
            </div>
        )
    }

    render() {
        const { residents, home } = this.props;

        let activeResidents;
        if (residents && residents.length) {
            activeResidents = _.filter(residents, res => res.status === 'active');
        }

        const onClick = () => {
            this.props.onCreate('Resident');
        }

        return (
            <div>
                <h2 className="lmc-card-title">
                    { TITLE }
                </h2>
                <div className="lmc-card">
                    <div className="lmc-card-body">
                        { 
                            activeResidents && activeResidents.length ? 
                                this.renderResidents(activeResidents, home) :
                                this.renderNoResidents(home)
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
                                title={`Create Profile`}
                            >
                                <ResponsiveText
                                    visibleSM="Create"
                                    visibleMD="Create"
                                    visibleLG={`Create Profile`}
                                />
                            </GlyphButton>
                        </div>
                        <div style={{ maxWidth: 95 }}>
                            <Link to={`${Keystone.adminPath}/residents`}>
                                <Button color="default">
                                    <span style={{ opacity: 0.6 }}>
                                        { VIEW_BUTTON_TEXT }
                                    </span>
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

const MAX_RESIDENTS_DISPLAYED = 20;
const TITLE = "Residents";
const VIEW_BUTTON_TEXT = "View all";
const NO_ACTIVE_RESIDENTS = ``;
const NO_RESIDENTS_INFO = `You have not added any residents yet. 
    You’ll need to add them here before anything appears in the Carer App`;



export default LmcResidentsCard;