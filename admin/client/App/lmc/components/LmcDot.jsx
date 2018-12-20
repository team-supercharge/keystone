import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite/no-important';


class LmcDot extends Component {
    render() {
        const {
            color = '#b3d78b',
            label,
            active,
            selectable,
            size = 24,
            fontSize = 12,
            onSelect,
            margin = '0 8px',
        } = this.props;

        const classes = StyleSheet.create({
            dot: {
                height: size,
                width: size,
                fontSize,
                paddingTop: Math.floor(size / 5),
                color: 'white',
                margin,
                textAlign: 'center',
                backgroundColor: active ? color : '#d1d3d4',
                borderRadius: '50%',
                display: 'inline-block',
            },
            selectable: {
                ':hover': {
                    opacity: 0.7,
                    cursor: 'pointer',
                }
            }
        });

        return (
            <div onClick={() => onSelect && onSelect()} className={css(classes.dot, selectable && classes.selectable)}>
                {label}
            </div>
        );
    }
}

LmcDot.propTypes = {
    color: PropTypes.string,
    label: PropTypes.string,
    active: PropTypes.bool,
    selectable: PropTypes.bool,
    size: PropTypes.number,
};

export default LmcDot;