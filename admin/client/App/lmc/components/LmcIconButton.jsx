import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite/no-important';

class LmcIconButton extends Component {
    render() {
        const { icon, color, label, onSelect } = this.props;
        const _label = (label.split('/')[1] || label).replace(/^\s/, '');
        return (
            <div className={css(classes.container)} onClick={onSelect}>
                <div id="lmc-selectable-icon" className={css(classes.iconButton)} style={{ backgroundColor: color || '#f9f9f9' }}>
                    <img src={icon} alt="" className={css(classes.icon)}/>
                </div>
                <p>
                    { _label }
                </p>
            </div>
        );
    }
};

LmcIconButton.propTypes = {
    onSelect: PropTypes.func.isRequired,
};

const classes = StyleSheet.create({
    container: {
        cursor: 'pointer',
        padding: 3,
        width: 110,
        display: 'inline-block',
        verticalAlign: 'top',
        textAlign: 'center',
        ':hover #lmc-selectable-icon': {
            border: '3px solid rgba(255,255,255,0.5)',
        },
    },
    iconButton: {
        width: 60,
        height: 60,
        transition: 'all 0.3s ease-in-out',
        border: '3px solid rgba(255,255,255,0)',
        borderRadius: 10,
        margin: '0 auto',
    },
    icon: {
        // width: 30,
        height: 30,
        marginTop: 12,
    }
});

export default LmcIconButton;