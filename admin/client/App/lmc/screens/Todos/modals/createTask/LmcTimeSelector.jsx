import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite/no-important';
import Select from 'react-select'; // https://react-select.com/props
import Flatpickr from 'react-flatpickr'; // https://github.com/coderhaoxin/react-flatpickr#usage
import moment from 'moment';
import _ from 'lodash';
import { LmcDot } from '../../../../components';
import { colors } from '../../../../common/constants';
import { connect } from 'react-redux';
import {
    setFormField,
    setRecurrenceType,
    toggleRecurrenceOption,
} from '../../actions';

window.moment = moment;
class LmcTimeSelector extends Component {

    constructor(props) {
        super(props);
        this.renderTimePicker = this.renderTimePicker.bind(this);
        this.renderRecurringSelector = this.renderRecurringSelector.bind(this);
        this.toggleRecurring = this.toggleRecurring.bind(this);
        this.renderReccuranceToggle = this.renderReccuranceToggle.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
    }

    componentDidMount() {
        const {
            recurrence,
            date,
            startDate,
        } = this.props.formData;

        if (!recurrence) {
            this.props.setFormField({
                key: 'recurrence',
                value: 'once',
            });
        };

        if (!startDate) {
            // 2018-08-20T18:14:02.000Z
            this.props.setFormField({
                key: 'startDate',
                value: moment(),
            });
        }
    }

    handleTimeChange(newDate) {
        const { startDate } = this.props.formData;
        const d = moment(newDate[0]);
        this.props.setFormField({
            key: 'startDate',
            value: startDate.set({
                hour: d.get('hour'),
                minute: d.get('minute'),
            }),
        });
    }

    handleDateChange(newDate) {
        const { startDate } = this.props.formData;
        const d = moment(newDate[0]);
        this.props.setFormField({
            key: 'startDate',
            value: d.set({
                hour: startDate.get('hour'),
                minute: startDate.get('minute'),
            }),
        });
    }

    renderTimePicker() {
        const { startDate } = this.props.formData;
        if (!startDate) return null;

        const currentDate = startDate.toDate();
        
        const date_options = {
            dateFormat: "d M",
            defaultDate: currentDate,
        };

        const time_options = {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            defaultDate: currentDate,
            time_24hr: true
        };

        return (
            <div className={css(classes.timeInputContainer)}>
                <Flatpickr className={css(classes.input, classes.dateInput)}
                        options={date_options}
                        onChange={this.handleDateChange} />
                <span style={{ margin: 20, fontSize: 16 }}>
                    at:
                </span>
                <Flatpickr className={css(classes.input, classes.timeInput)}
                    options={time_options}
                    onChange={this.handleTimeChange} />
            </div>
        )
    }

    renderRecurringSelector() {

        const { recurrence, recurrenceOptions } = this.props.formData;

        const recTypes = [
            { value: 'every_15', label: 'Every 15m' },
            { value: 'hourly', label: 'Hourly' },
            { value: 'daily', label: 'Daily' },
            { value: 'weekly', label: 'Weekly' },
            { value: 'biweekly', label: 'Bi-weekly' },
            { value: 'monthly', label: 'Monthly' },
        ];

        return (
            <div className={css(classes.reccuranceSelector)}>
                <div style={{ paddingTop: 30, zIndex: 1000 }}>
                    <Select
                        className={css(classes.selectRecType)}
                        isClearable={false}
                        simpleValue
                        value={recurrence}
                        options={recTypes}
                        onChange={this.props.setRecurrenceType}
                    />
                </div>
                <div className={css(classes.timeOptions)}>
                    {recurrence === 'daily'
                        ? <div>
                            <p>{ HELP_DAILY }</p>
                            {recurrenceOptions.map(({ key, active }, i) => (
                                <LmcDot label={key}
                                    selectable
                                    active={active}
                                    size={30}
                                    onSelect={() => this.props.toggleRecurrenceOption(i)}
                                    fontSize={14}/>
                            ))}
                        </div>
                        : null}
                    {recurrence === 'hourly' || recurrence === 'every_15'
                        ? <div>
                            <p>{ HELP_HOURLY }</p>
                            { recurrenceOptions.map((row, i) => (
                                <div key={row.key} onClick={() => this.props.toggleRecurrenceOption(i)} className={css(classes.timeSelectorRow, !row.active && classes.timeSelectorRow__active)}>
                                    <span style={{ position: 'relative', top: -2, left: -10 }}>
                                        <LmcDot
                                            label={row.active ? <span>&#10003;</span> : 'X'}
                                            active={row.active}
                                            size={14}
                                            margin={'0 6px 0 0'}
                                            fontSize={8}/>
                                    </span> { row.key }
                                </div>
                            ))}
                        </div> 
                        : null}
                </div>
            </div>
        );
    }

    onDailyClick(index) {
        this.props.toggleRecurrenceOption(index);
    }

    renderReccuranceToggle() {
        const { recurrence } = this.props.formData;
        const isRecurring = recurrence !== 'once';
        return (
            <div className={css(classes.toggleButton)} onClick={() => this.toggleRecurring()}>
                <LmcDot
                    label={isRecurring ? <span>&#10003;</span> : 'X'}
                    active={isRecurring}
                    color='#b3d78b'
                />  Recurring?
            </div>
        )
    }

    toggleRecurring() {
        // options: 'once, daily, weekly, bi-weekly, monthly, annually',
        const { recurrence } = this.props.formData;
        let value = (recurrence === 'once') ? 'daily' : 'once';
        // this.props.setFormField({ key: 'recurrence', value });
        this.props.setRecurrenceType(value);
        // this.props.setFormField({ key: 'recurrenceOptions', value: recurrenceOptions });
    }

    render() {
        const { recurrence } = this.props.formData;
        return (
            <div className={css(classes.container)}>
                <h2>{TITLE}</h2>
                <div className={css(classes.formBody)} >
                    {this.renderTimePicker()}
                    {this.renderReccuranceToggle()}
                    {recurrence !== 'once' ? this.renderRecurringSelector() : null}
                </div>
            </div>
        );
    }
}

LmcTimeSelector.propTypes = {
    onSelect: PropTypes.func.isRequired,
};

const TITLE = 'When is a good time to start?';
const NEXT_LABEL = 'Next Step';
const HELP_HOURLY = 'You can skip any hours you don\'t want this done - like lunch times';
const HELP_DAILY = 'You can skip any days you don\'t want this done - like weekends';

const classes = StyleSheet.create({
    container: {
        margin: 20,
        textAlign: 'center',
    },
    formBody: {
        width: '80%',
        margin: '40px auto 0'
    },
    timeInputContainer: {
        paddingBottom: 30,
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
    nextButton: {
        marginTop: 60,
        marginBottom: 40,
    },
    dot: {
        height: 24,
        width: 24,
        fontSize: 11,
        paddingTop: 4,
        color: 'white',
        margin: '0 8px',
        backgroundColor: '#d1d3d4',
        borderRadius: '50%',
        display: 'inline-block',
    },
    activeDot: {
        backgroundColor: '#b3d78b',
    },
    toggleButton: {
        ':hover': {
            opacity: 0.9,
            color: '#6d6d6d',
        },
        fontWeight: 'bold',
        width: 170,
        margin: '0 auto',
        backgroundColor: '#fff',
        cursor: 'pointer',
        zIndex: 100,
        position: 'relative',
    },
    reccuranceSelector: {
        maxWidth: 625,
        margin: '0 auto',
        border: '1px solid #eaeaea',
        position: 'relative',
        top: -12,
    },
    timeOptions: {
        padding: 20,
    },
    selectRecType: {
        width: 180,
        margin: '0 auto',
        ':nth-child(1n) .Select-clear-zone': {
            display: 'none',
        },
    },
    timeSelectorRow: {
        display: 'inline-block',
        width: 100,
        margin: 9,
        padding: '5px 8px',
        border: '1px solid #cecece',
        borderRadius: 4,
        ':hover': {
            backgroundColor: '#f3f3f3',
            // opacity: 0.8,
            cursor: 'pointer',
        },
    },
    timeSelectorRow__active: {
        opacity: 0.2,
        backgroundColor: '#f7f7f7',
    }
});


const mapStateToProps = (state) => ({
    formData: state.modal.formData,
})

const mapDispatchToProps = dispatch => ({
	setFormField: (val) => dispatch(setFormField(val)),
	toggleRecurrenceOption: (index) => dispatch(toggleRecurrenceOption(index)),
	setRecurrenceType: (type) => dispatch(setRecurrenceType(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LmcTimeSelector);
