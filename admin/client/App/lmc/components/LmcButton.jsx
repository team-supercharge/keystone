import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite/no-important';
import { colors } from '../common/constants';


class LmcButton extends Component {

    constructor(props) {
        super(props);
        this.classes = StyleSheet.create({
            button: {
                color: 'white',
                background: colors[props.color] || colors.bw20,
                padding: '7px 18px',
                border: 'none',
                borderRadius: 6,
                letterSpacing: 1,
                transition: 'all 0.2s ease-in-out',
                ':focus': {
                    outline:0,
                },
                ':hover': {
                    // -webkit-box-shadow: 2px 2px 16px 0px rgba(0,0,0,0.2);
                    // -moz-box-shadow: 2px 2px 16px 0px rgba(0,0,0,0.2);
                    boxShadow: '2px 2px 4px 0px rgba(0,0,0,0.15)',
                }
            }
        });
    }

    render() {
        return (
            <button className={css(this.classes.button)} {...this.props}>
                {this.props.children}
            </button>
        );
    }
}



export default LmcButton;
