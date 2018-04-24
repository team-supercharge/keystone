import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
    Button,
	GlyphButton,
	ResponsiveText,
} from '../../../../elemental';
import { Link } from 'react-router';

const formatName = (name) => {
    let n = name.split(' ');
    n = (n.length > 1)
        ? `${ n[0] } ${ n[1][0] }`
        : name;
    if (n.length > 9) n = n.substr(0, 7) + '..';
    return n;
};

const ResidentRow = (row, index) => {
    const picture = row.picture || 'https://s3-eu-west-2.amazonaws.com/lmc-marketing-public/wp-content/uploads/2018/04/12092141/profile_pic_placeholder.png';
    let name = row.name.split(' ');
    name = `${ name[0] } ${ name[1][0] }`;
    return (
        <Link key={index}
            to={`${Keystone.adminPath}/residents/${row.id}`}
            className="lmc-profile-link">
            <div className="lmc-profile-picture" style={{ background: `url(${picture})` }}></div>
            <p style={{ fontSize: 11, color: 'black', opacity: 0.5, marginBottom: 1 }}>
                { formatName(name) }
            </p>
        </Link>
    )
}


class LmcResidentsCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            max_residents_displayed: MAX_RESIDENTS_DISPLAYED_INIT,
        };
        this.showMore = this.showMore.bind(this);
        this.renderResidents = this.renderResidents.bind(this);
    }

    showMore() {
        this.setState({
            max_residents_displayed: this.state.max_residents_displayed + 5, // + 1 row
        })
    }

    renderResidents(activeResidents) {
        const { max_residents_displayed } = this.state;
        const hiddenResidents = activeResidents.length > max_residents_displayed;
        const home = activeResidents[0].home;
        return (
            <div>
                <p>
                    { home
                        ? <span>{ home } has </span>
                        : 'There are ' }
                    <strong>{ activeResidents.length } active residents</strong>
                </p>
                <div className="lmc-flex-grid">
                    { _.take(activeResidents, hiddenResidents ? max_residents_displayed - 1 : max_residents_displayed)
                        .map(ResidentRow) }
                    { hiddenResidents
                        ? <a className="lmc-more-link" onClick={this.showMore}>More...</a>
                        : null }
                </div>
            </div>
        )
    }

    renderNoResidents() {
        return (
            <p>
                { NO_RESIDENTS_INFO }
            </p>
        )
    }

    renderNoActiveResidents() {
        return (
            <p>
                There are no active residents.
            </p>
        )
    }

    render() {
        const { residents } = this.props;
        let activeResidents;
        if (residents && residents.length) {
            activeResidents = _.chain(residents)
                .filter(res => res.status === 'active')
                .sortBy('name')
                .value();
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
                                this.renderResidents(activeResidents) :
                                this.renderNoResidents()
                        }
                    </div>
                    <div className="lmc-card-footer">
                        <div className="lmc-flex-container">
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

const MAX_RESIDENTS_DISPLAYED_INIT = 10;
const TITLE = 'Residents';
const VIEW_BUTTON_TEXT = 'View All';
const NO_ACTIVE_RESIDENTS = ``;
const NO_RESIDENTS_INFO = `You have not added any residents yet. 
    You’ll need to add them here before anything appears in the Carer App`;



export default LmcResidentsCard;