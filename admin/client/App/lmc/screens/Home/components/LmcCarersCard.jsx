import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
	GlyphButton,
	ResponsiveText,
} from '../../../../elemental';
import { Link } from 'react-router';
import _ from 'lodash';

const formatName = (name) => {
    let n = name.split(' ');
    return (n.length > 1)
        ? `${ n[0] } ${ n[1][0] }`
        : name;
};


const ProfileRow = (row, index) => {
    const picture = row.picture || PLACEHOLDER_IMAGE;
    let name = row.name.split(' ');
    name = `${ name[0] } ${ name[1][0] }`;
    return (
        <Link key={index}
            to={`${ Keystone.adminPath }/users/${ row.id }`}
            className="lmc-profile-link">
            <div className="lmc-profile-picture" style={{ background: `url(${picture})` }}></div>
            <p style={{ fontSize: 12, color: 'black', opacity: 0.5 }}>
                { formatName(name) }
            </p>
        </Link>
    )
}


class LmcCarersCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            max_carers_displayed: MAX_CARERS_DISPLAYED,
        };
        this.showMore = this.showMore.bind(this);
        this.renderActiveCarers = this.renderActiveCarers.bind(this);
    }

    renderActiveCarers(activeCarers) {
        const { max_carers_displayed } = this.state;
        const hiddenCarers = activeCarers.length > max_carers_displayed;
        const n_showing = hiddenCarers ? max_carers_displayed - 1 : max_carers_displayed;
        return (
            <div>
                <p>
                    <strong>
                        { activeCarers.length } { activeCarers.length === 1 ? " member " : " members " }
                    </strong>
                    { activeCarers.length === 1 ?
                        ACTIVE_TODAY_SINGULAR : 
                        ACTIVE_TODAY_PLURAL }
                </p>
                <div className="lmc-flex-grid">
                    { _.take(activeCarers, n_showing).map(ProfileRow) }
                    { hiddenCarers
                        ? <a className="lmc-more-link" onClick={this.showMore}>More...</a>
                        : null }
                </div>
            </div>
        )
    }
    renderNoCarers() {
        return (
            <p>
                { NO_CARERS }
            </p>
        )
    }

    renderNoActiveCarers() {
        return (
            <p>
                { NO_ACTIVE_CARERS }
            </p>
        )
    }

    showMore() {
        this.setState({
            max_carers_displayed: this.state.max_carers_displayed + 5,
        })
    }

    render() {
        const { carers, logs } = this.props;
        const onClick = () => {
            this.props.onCreate('User');
        }

        const homeHasCarers = _.filter(carers, d => d.role === 'carer');
        const activeIds = _(logs).map('carerId').uniq().value();
        const activeToday = _.chain(carers)
            .filter(d => !_.indexOf(activeIds, d.id))
            .sortBy('name')
            .value();

        return (
            <div>
                <h2 className="lmc-card-title">
                    { TITLE }
                </h2>
                <div className="lmc-card">
                    <div className="lmc-card-body">
                        { !homeHasCarers || !homeHasCarers.length ?
                                this.renderNoCarers() :
                                !activeToday || !activeToday.length ? 
                                    this.renderNoActiveCarers() :
                                    this.renderActiveCarers(activeToday)
                        }
                    </div>
                    <div className="lmc-card-footer">
                        <div className="lmc-flex-container">
                            <div style={{ maxWidth: 190 }} id="intro-js-step-add-carers">
                                <GlyphButton
                                    block
                                    color="success"
                                    glyph="plus"
                                    onClick={onClick}
                                    position="left"
                                    title={`Invite Team Member`} >
                                    <ResponsiveText
                                        visibleSM="Create"
                                        visibleMD="Create"
                                        visibleLG={`Invite Team Member`}
                                    />
                                </GlyphButton>
                            </div>
                            <div style={{ maxWidth: 95 }}>
                                <Link to={`${Keystone.adminPath}/users`}>
                                    <Button color="default">
                                        <span style={{ opacity: 0.6 }}>
                                            View All
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

LmcCarersCard.propTypes = {

};

let MAX_CARERS_DISPLAYED = 10;
const TITLE = 'Team';
const ACTIVE_TODAY_PLURAL = 'of your care team have been active today';
const ACTIVE_TODAY_SINGULAR = 'of your care team has been active today';
const NO_CARERS = "Looks like you haven't added any carers yet!";
const NO_ACTIVE_CARERS = `It doesn’t look like any ${ACTIVE_TODAY_PLURAL}`;
const PLACEHOLDER_IMAGE = 'https://s3-eu-west-2.amazonaws.com/lmc-marketing-public/wp-content/uploads/2018/04/12092141/profile_pic_placeholder.png';


export default LmcCarersCard;