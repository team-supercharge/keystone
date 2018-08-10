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
import moment from 'moment';


class LmcCarersCard extends Component {

    constructor (props) {
        super(props);
        this.state = {
            carers_displayed: INIT_CARERS_DISPLAYED,
        };
        this.showMore = this.showMore.bind(this);
        this.renderActiveCarers = this.renderActiveCarers.bind(this);
    }

    renderActiveCarers (activeCarers) {
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
        );
    }

    showMore () {
        this.setState({
            carers_displayed: this.state.carers_displayed + 5,
        });
    }

    getActiveCarers (logs, carers) {
        const cutoffTime = moment().subtract(12, 'h');
        const activeIds = _.chain(logs)
            .filter(log => moment(log.timeLogged).isAfter(cutoffTime))
            .map('carerId')
            .uniq()
            .value();

        return _.chain(carers)
            .filter(d => _.includes(activeIds, d.id))
            .sortBy('name')
            .value();
    }

    render () {
        const { carers, logs } = this.props;
        const onClick = () => {
            this.props.onCreate('User');
        };

        const carerCount = _.filter(carers, { active: true }).length;
        const activeToday = this.getActiveCarers(logs, carers);

        return (
            <div>
                <h2 className="lmc-card-title">
                    { TITLE }
                </h2>
                <div className="lmc-card">
                    <div className="lmc-card-body">
                        { !carers || carerCount < 2
                                ? <p>{ NO_CARERS }</p>
                                : !activeToday || !activeToday.length
                                    ? <p>{ NO_ACTIVE_CARERS }</p>
                                    : this.renderActiveCarers(activeToday)
                        }
                    </div>
                    <div className="lmc-card-footer">
                        <div className="lmc-flex-container">
                            <div style={styles.inviteButton} id="intro-js-step-add-carers">
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
                            <div style={styles.buttonContainer}>
                                <Link to={`${Keystone.adminPath}/users`}>
                                    <Button color="default">
                                        <span style={styles.viewAllButton}>
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
    },
    buttonContainer: {
        maxWidth: 95,
    },
    inviteButton: {
        maxWidth: 190,
    },
    viewAllButton: {
        opacity: 0.6,
    },
};

LmcCarersCard.propTypes = {
    carers: PropTypes.array,
    logs: PropTypes.array,
    onCreate: PropTypes.func.isRequired,
};

const INIT_CARERS_DISPLAYED = 10;
const TITLE = 'Team';
const ACTIVE_TODAY_PLURAL = 'of your care team have been active recently';
const ACTIVE_TODAY_SINGULAR = 'of your care team has been active recently';
const NO_CARERS = "Looks like you haven't added any carers yet!";
const NO_ACTIVE_CARERS = `It doesn’t look like any ${ACTIVE_TODAY_PLURAL}`;


export default LmcCarersCard;
