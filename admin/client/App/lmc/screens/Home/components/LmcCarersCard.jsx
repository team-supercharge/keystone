import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
	GlyphButton,
	ResponsiveText,
} from '../../../../elemental';
import { Link } from 'react-router';


class LmcCarersCard extends Component {
    render() {
        const { carers, logs } = this.props;
        const onClick = () => {
            this.props.onCreate('User');
        }

        return (
            <div>
                <h2 className="lmc-card-title">
                    Staff
                </h2>
                <div className="lmc-card">
                    <div className="lmc-card-body">
                        
                    </div>
                    <div className="lmc-card-footer">
                        <div style={{maxWidth: 190}}>
                            <GlyphButton
                                block
                                color="success"
                                glyph="plus"
                                onClick={onClick}
                                position="left"
                                title={`Create Team Member`}
                            >
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

LmcCarersCard.propTypes = {

};

export default LmcCarersCard;