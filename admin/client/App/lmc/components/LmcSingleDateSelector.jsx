import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

class LmcSingleDateSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
        }
        this.nextDate = this.nextDate.bind(this);
        this.prevDate = this.prevDate.bind(this);
    }

    nextDate() {
        const { onChange, date } = this.props;
        onChange({
            date: moment(date).add(1, 'd')
        });
    }

    prevDate() {
        const { onChange, date } = this.props;
        onChange({
            date: moment(date).subtract(1, 'd')
        });
    }

    render() {
        const { date, onChange } = this.props;
        const { focused } = this.state;
        return (
            <span>
                <span style={styles.button} onClick={this.prevDate}>
                    <i className="octicon octicon-chevron-left"></i>
                </span>
                <SingleDatePicker
                    displayFormat="MMM D"
                    isOutsideRange={() => false}
                    hideKeyboardShortcutsPanel
                    date={date} // momentObj or null
                    onDateChange={date => onChange({ date })}
                    focused={focused}
                    onFocusChange={({ focused }) => this.setState({ focused })}
                    id="lmc_single_date_picker"
                />
                <span style={styles.button} onClick={this.nextDate}>
                    <i className="octicon octicon-chevron-right"></i>
                </span>
            </span>
        );
    }
}

const styles = {
    button: {
        padding: '6px 8px 10px 8px',
        cursor: 'pointer',
    }
}

LmcSingleDateSelector.propTypes = {
    date: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default LmcSingleDateSelector;