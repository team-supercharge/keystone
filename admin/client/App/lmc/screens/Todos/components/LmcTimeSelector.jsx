import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite/no-important';
import {
    GlyphButton,
} from '../../../../elemental';
// import 'flatpickr/dist/themes/material_green.css';
import Flatpickr from 'react-flatpickr';
import moment from 'moment';
// https://github.com/coderhaoxin/react-flatpickr#usage

class LmcTimeSelector extends Component {
    constructor(props) {
        super(props);
        this.renderTimePicker = this.renderTimePicker.bind(this);
        this.renderRecurringSelector = this.renderRecurringSelector.bind(this);
        this.toggleRecurring = this.toggleRecurring.bind(this);
        this.renderNextButton = this.renderNextButton.bind(this);
        this.renderReccuranceToggle = this.renderReccuranceToggle.bind(this);
        this.state = {};
    }

    renderTimePicker() {
        const date_options = {
            dateFormat: "d M",
            defaultDate: new Date()
        };
        const time_options = {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            defaultDate: new Date(),
            time_24hr: true
        };
        return (
            <div className={css(classes.timeInputContainer)}>
                <Flatpickr className={css(classes.input, classes.dateInput)}
                        options={date_options}
                        onChange={date => { console.log(date) } } />
                <span style={{ margin: 20, fontSize: 16 }}>
                    at:
                </span>
                <Flatpickr className={css(classes.input, classes.timeInput)}
                    options={time_options}
                    onChange={date => { this.setState({date}) }} />
            </div>
        )
    }

    renderRecurringSelector() {
        const { isRecurring } = this.state;
        if (isRecurring) return (
            <div className={css(isRecurring && classes.is)}>
                Selector
            </div>
        );
    }

    renderReccuranceToggle() {
        const { isRecurring } = this.state;
        return (
            <div className={css(classes.toggleButton)} onClick={() => this.toggleRecurring()}>
                <span className={css(classes.dot, )}>x</span> Reoccurring?
            </div>
        )
    }

    renderNextButton() {
        const { onSelect } = this.props;
        return (
            <GlyphButton
                onClick={() => onSelect()}
                glyph="chevron-left"
                color="success"
                position="center">
                {NEXT_LABEL}
            </GlyphButton>
        )
    }

    toggleRecurring() {
        this.setState({ isRecurring: !this.state.isRecurring });
    }

    render() {
        return (
            <div className={css(classes.container)}>
                <h2>{TITLE}</h2>
                <div className={css(classes.formBody)} >
                    {this.renderTimePicker()}
                    {this.renderReccuranceToggle()}
                    {this.renderRecurringSelector()}
                    {this.renderNextButton()}
                </div>
            </div>
        );
    }
}

LmcTimeSelector.propTypes = {
    onSelect: PropTypes.func.isRequired,
};

const TITLE = 'When is a good time?';
const NEXT_LABEL = 'Next Step';

const classes = StyleSheet.create({
    toggleButton: {
        fontWeight: 'bold',
    },
    container: {
        margin: 20,
        textAlign: 'center',
    },
    formBody: {
        // textAlign: 'center',
        width: '80%',
        margin: '40px auto 0'
    },
    timeInputContainer: {
        paddingBottom: 20,
    },
    input: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 300,
        border: '1px solid #eaeaea',
        borderRadius: 4,
        width: 120,
        letterSpacing: 1,
        padding: '8px 4px',
    },
    timeInput: {},
    dateInput: {},
    dot: {
        height: 16,
        width: 16,
        margin: '0 8px',
        backgroundColor: '#d1d3d4',
        borderRadius: '50%',
        display: 'inline-block',
    },
    activeDot: {
        backgroundColor: '#e85b77',
    },
});

export default LmcTimeSelector;
