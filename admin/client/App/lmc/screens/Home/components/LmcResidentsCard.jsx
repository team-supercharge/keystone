import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
    Button,
	GlyphButton,
	ResponsiveText,
} from '../../../../elemental';
import { Link } from 'react-router';
import LmcProfileLink from '../../../components/LmcProfileLink.jsx';


class LmcResidentsCard extends Component {

    constructor (props) {
        super(props);
        this.state = {
            max_residents_displayed: MAX_RESIDENTS_DISPLAYED_INIT,
        };
        this.showMore = this.showMore.bind(this);
        this.renderResidents = this.renderResidents.bind(this);
    }

    showMore () {
        this.setState({
            max_residents_displayed: this.state.max_residents_displayed + 20, // + 1 row
        });
    }

    renderResidentCount (count, home) {
        return (
            <p>
                { home
                    ? <span>{ home } has </span>
                    : 'There are ' }
                <strong>{ count } active residents</strong>
            </p>
        );
    }

    renderResidents (activeResidents) {
        const { max_residents_displayed } = this.state;
        const hiddenResidents = activeResidents.length > max_residents_displayed;
        const home = activeResidents[0].home;
        return (
            <div>
                { home && activeResidents.length > 10
                    ? this.renderResidentCount(activeResidents.length, home)
                    : null }
                <div className="lmc-flex-grid">
                    { _.take(activeResidents, hiddenResidents ? max_residents_displayed - 1 : max_residents_displayed)
                        .map((row, index) =>
                            <LmcProfileLink
                                to={`${ Keystone.adminPath }/residents/${ row.id }`}
                                key={row.id}
                                name={row.name}
                                picture={row.picture}
                            />) }
                    { hiddenResidents
                        ? <a className="lmc-more-link" onClick={this.showMore}>More...</a>
                        : null }
                </div>
            </div>
        );
    }

    renderNoResidents () {
        return (
            <p>
                { NO_RESIDENTS_INFO }
            </p>
        );
    }

    renderNoActiveResidents () {
        return (
            <p>
                There are no active residents.
            </p>
        );
    }

    render () {
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
        };

        return (
            <div>
                <h2 className="lmc-card-title">
                    { TITLE }
                </h2>
                <div className="lmc-card">
                    <div className="lmc-card-body">
                        { activeResidents && activeResidents.length
                                ? this.renderResidents(activeResidents)
                                : this.renderNoResidents() }
                    </div>
                    <div className="lmc-card-footer">
                        <div className="lmc-flex-container">
                            <div style={{ maxWidth: 160 }} id="intro-js-step-add-residents">
                                <GlyphButton
                                    block
                                    color="success"
                                    glyph="plus"
                                    onClick={onClick}
                                    position="left"
                                    title={ADD_RESIDENTS_BUTTON_TEXT}
                                >
                                    <ResponsiveText
                                        visibleSM={ADD_RESIDENTS_BUTTON_TEXT}
                                        visibleMD={ADD_RESIDENTS_BUTTON_TEXT}
                                        visibleLG={ADD_RESIDENTS_BUTTON_TEXT}
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

// const styles = {
//     title: {
//         opacity: 0.8,
//     }
// }

LmcResidentsCard.propTypes = {
    onCreate: PropTypes.func.isRequired,
    residents: PropTypes.array.isRequired,
};

const MAX_RESIDENTS_DISPLAYED_INIT = 10;
const TITLE = 'Residents';
const VIEW_BUTTON_TEXT = 'View All';
const ADD_RESIDENTS_BUTTON_TEXT = 'Add a Resident';
// const NO_ACTIVE_RESIDENTS = ``;
const NO_RESIDENTS_INFO = `You have not added any residents yet. 
    You’ll need to add them here before anything appears in the Carer App`;

export default LmcResidentsCard;
