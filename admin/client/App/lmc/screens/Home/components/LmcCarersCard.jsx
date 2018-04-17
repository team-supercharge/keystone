import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
	GlyphButton,
	ResponsiveText,
} from '../../../../elemental';
import { Link } from 'react-router';
import _ from 'lodash';


const RowPlaceholder = (row, index) => {
    const picture = row.picture || PLACEHOLDER_IMAGE;
    return (
        <Link key={index}
            to={`${ Keystone.adminPath }/users/${ row.id }`}
            style={{ width: 50, float: 'left', margin: '0 1px 5px' }}>
            <img height="45" src={picture} alt="" style={{ borderRadius: 50 }} />
        </Link>
    )
}


class LmcCarersCard extends Component {

    renderActiveCarers(activeCarers) {
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
                { _.take(activeCarers, MAX_CARERS_DISPLAYED).map(RowPlaceholder) }
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

    render() {
        const { carers, logs } = this.props;
        const onClick = () => {
            this.props.onCreate('User');
        }

        const homeHasCarers = _.filter(carers, d => d.role === "carer");
        const activeIds = _(logs).map('carerId').uniq().value();
        const activeToday = _.filter(carers, d => !_.indexOf(activeIds, d.id));

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
                        <div style={{maxWidth: 190}}>
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

const MAX_CARERS_DISPLAYED = 20;
const TITLE = 'Team';
const ACTIVE_TODAY_PLURAL = 'of your care team have been active today';
const ACTIVE_TODAY_SINGULAR = 'of your care team has been active today';
const NO_CARERS = "Looks like you haven't added any carers yet!";
const NO_ACTIVE_CARERS = `It doesn’t look like any ${ACTIVE_TODAY_PLURAL}`;
const PLACEHOLDER_IMAGE = 'https://s3-eu-west-2.amazonaws.com/lmc-marketing-public/wp-content/uploads/2018/04/12092141/profile_pic_placeholder.png';


export default LmcCarersCard;