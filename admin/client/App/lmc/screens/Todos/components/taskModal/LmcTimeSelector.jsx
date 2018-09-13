import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite/no-important';
import Select from 'react-select'; // https://react-select.com/props
import Flatpickr from 'react-flatpickr'; // https://github.com/coderhaoxin/react-flatpickr#usage
import moment from 'moment';
import { GlyphButton } from '../../../../../elemental';
import { LmcDot } from '../../../../components';
import _ from 'lodash';


const TimeSelectorRow = ({ time, onChange }) => (
    <div onClick={onChange} className={css(classes.timeSelectorRow)}>
        { time }
    </div>
)

const TimeGridSelector = (options) => {

    const hangeChange = (index) => {
        console.log(index);
    }

    return (
        <div>
            {options.map(time => <TimeSelectorRow time={time} onChange={() => {}} />)}
        </div>
    );
}

class LmcTimeSelector extends Component {

    constructor(props) {
        super(props);
        this.renderTimePicker = this.renderTimePicker.bind(this);
        this.renderRecurringSelector = this.renderRecurringSelector.bind(this);
        this.toggleRecurring = this.toggleRecurring.bind(this);
        this.renderNextButton = this.renderNextButton.bind(this);
        this.renderReccuranceToggle = this.renderReccuranceToggle.bind(this);
        this.onDailyClick = this.onDailyClick.bind(this);
        this.handleRecChange = this.handleRecChange.bind(this);
        this.state = {
            isRecurring: false,
            recType: 'daily',
            recOptions: this.getOptions('daily'),
        };
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

    getOptions(type) {
        if (type === 'every_15') {
            let i = 24 * 4;
            let times = []
            while(i--) times.unshift({
                time: moment().startOf('d').add(i * 15, 'm'), // .format('HH:mm'),
                active: true,
            })
            return times;
        } else if (type === 'hourly') {
            let i = 24;
            let times = []
            while(i--) times.unshift({
                time: moment().startOf('d').add(i, 'h'), // .format('HH:mm'),
                active: true,
            });
            return times;
        } else if (type === 'daily') {
            return [
                { label: 'MO', active: true },
                { label: 'TU', active: true },
                { label: 'WE', active: true },
                { label: 'TH', active: true },
                { label: 'FR', active: true },
                { label: 'SA', active: true },
                { label: 'SU', active: true },
            ];
        };
    }

    handleRecChange(recType) {
        this.setState({
            recType,
            recOptions: this.getOptions(recType)
        });
    }

    renderDayPicker() {

    }

    timeSelectorRow(date) {
        const time_options = {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            defaultDate: date || new Date(),
            time_24hr: true
        };

        return (
            <Flatpickr className={css(classes.input, classes.timeInput)}
                options={time_options}
                onChange={date => { this.setState({date}) }} />
        )
    }

    renderRecurringSelector() {
        const {
            isRecurring,
            recType,
            recOptions,
        } = this.state;

        const recTypes = [
            { value: 'every_15', label: 'Every 15m' },
            { value: 'hourly', label: 'Hourly' },
            { value: 'daily', label: 'Daily' },
            { value: 'weekly', label: 'Weekly' },
            { value: 'biweekly', label: 'Bi-weekly' },
            { value: 'monthly', label: 'Monthly' },
        ];

        if (isRecurring) return (
            <div className={css(classes.reccuranceSelector)}>
                <div style={{ paddingTop: 30, zIndex: 1000 }}>
                    <Select
                        className={css(classes.selectRecType)}
                        isClearable={false}
                        simpleValue
                        value={recType}
                        options={recTypes}
                        onChange={(type) => this.handleRecChange(type)}
                    />
                </div>
                <div className={css(classes.timeOptions)}>
                    {recType === 'daily'
                        ? <div>
                            <p>{ HELP_DAILY }</p>
                            {recOptions.map(({ label, active }, i) => (
                                <LmcDot label={label}
                                    selectable
                                    active={active}
                                    size={30}
                                    onSelect={() => this.onDailyClick(i)}
                                    fontSize={14}/>
                            ))}
                        </div>
                        : null}
                    {recType === 'hourly' || recType === 'every_15'
                        ? <div>
                            <p>{ HELP_HOURLY }</p>
                            { recOptions.map((row, i) => (
                                <div key={row.time} onClick={() => this.onDailyClick(i)} className={css(classes.timeSelectorRow, !row.active && classes.timeSelectorRow__active)}>
                                    <span style={{ position: 'relative', top: -2, left: -10 }}>
                                        <LmcDot
                                            label={row.active ? <span>&#10003;</span> : 'X'}
                                            active={row.active}
                                            size={14}
                                            margin={'0 6px 0 0'}
                                            fontSize={8}/>
                                    </span> { row.time.format('HH:mm') }
                                </div>
                            ))}
                        </div> 
                        : null}
                </div>
            </div>
        );
    }

    onDailyClick(index) {
        let recOptions = _.cloneDeep(this.state.recOptions);
        recOptions[index].active = !recOptions[index].active;
        this.setState({ recOptions });
    }

    renderReccuranceToggle() {
        const { isRecurring } = this.state;
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

    renderNextButton() {
        const { onSelect } = this.props;
        return (
            <GlyphButton
                className={css(classes.nextButton)}
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

export default LmcTimeSelector;
