import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class LmcLink extends Component {
    render () {
        console.log('LmcLink', this);
        const { disabled } = this.props;
        if (disabled) {
            return <div>{ this.props.children }</div>;
        }
        return (
            <Link {...this.props}>
                { this.props.children }
            </Link>
        );
    }
}

LmcLink.propTypes = {
    disabled: PropTypes.bool,
};

export default LmcLink;
