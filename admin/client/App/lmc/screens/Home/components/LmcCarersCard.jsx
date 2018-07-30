import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
	GlyphButton,
	ResponsiveText,
} from '../../../../elemental';
import { Link } from 'react-router';
import _ from 'lodash';
import LmcProfileLink from '../../../components/LmcProfileLink.jsx';


class LmcCarersCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            carers_displayed: INIT_CARERS_DISPLAYED,
        };
        this.showMore = this.showMore.bind(this);
        this.renderActiveCarers = this.renderActiveCarers.bind(this);
    }

    renderActiveCarers(activeCarers) {
        const { carers_displayed } = this.state;
        const hiddenCarers = activeCarers.length > carers_displayed;
        const n_showing = hiddenCarers ? carers_displayed - 1 : carers_displayed;
        return (
            <div>
                <p>
                    <strong>
                        { activeCarers.length } { activeCarers.length === 1 ? ' member ' : ' members ' }
                    </strong>
                    { activeCarers.length === 1
                        ? ACTIVE_TODAY_SINGULAR
                        : ACTIVE_TODAY_PLURAL }
                </p>
                <div className="lmc-flex-grid">
                    { _.take(activeCarers, n_showing).map((row, index) =>
                        <LmcProfileLink
                            to={`${ Keystone.adminPath }/users/${ row.id }`}
                            key={row.id}
                            name={row.name}
                            picture={row.picture}
                        />) }
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
            carers_displayed: this.state.carers_displayed + 5,
        })
    }

    render() {
        const { carers, logs } = this.props;
        const onClick = () => {
            this.props.onCreate('User');
        }

        const carerCount = _.filter(carers, { active: true }).length;
        const activeIds = _.chain(logs).map('carerId').uniq().value();
        const activeToday = _.chain(carers)
            .filter(d => _.includes(activeIds, d.id))
            .sortBy('name')
            .value();

        return (
            <div>
                <h2 className="lmc-card-title">
                    { TITLE }
                </h2>
                <div className="lmc-card">
                    <div className="lmc-card-body">
                        { !carers || carerCount < 2 ?
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

const INIT_CARERS_DISPLAYED = 10;
const TITLE = 'Team';
const ACTIVE_TODAY_PLURAL = 'of your care team have been active today';
const ACTIVE_TODAY_SINGULAR = 'of your care team has been active today';
const NO_CARERS = "Looks like you haven't added any carers yet!";
const NO_ACTIVE_CARERS = `It doesn’t look like any ${ACTIVE_TODAY_PLURAL}`;


export default LmcCarersCard;
