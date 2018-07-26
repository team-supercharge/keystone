/*
React Dates doc: 
http://airbnb.io/react-dates/?selectedKind=SingleDatePicker%20%28SDP%29&selectedStory=default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import FormSelect from '../../elemental/FormSelect';
import FormLabel from '../../elemental/FormLabel';
import Form from '../../elemental/Form';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import LmcPdfExport from './LmcPdfExport.jsx';


class LmcLogFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            categoryValue: 0,
            itemValue: 0,
            startDate: null,
            endDate: null,
            date: null,
            focused: false,
        }

        this.filterByItem = this.filterByItem.bind(this);
        this.filterByCategory = this.filterByCategory.bind(this);
        this.onDatesChange = this.onDatesChange.bind(this);
        this.getFilteredData = this.getFilteredData.bind(this);
    }

    groupLogs(logs, key) {
        return [
            {
                label: "Any",
                value: "",
            },
            ... _(logs)
                .groupBy(key)
                .map((group, key) => {
                    return {
                        label: key, // `${} (${group.length} logs)`,
                        value: key,
                    }
                })
                .sortBy('label')
                .filter(d => d && d.label)
                .value(),
        ]
    }

    filterByItem(value) {
        this.setState({
            itemValue: target.value,
        });
    }

    filterByCategory({ target }, categories) {
        this.setState({
            categoryValue: target.value, // _.findIndex(categories, {value: target.value}) || 0,
        });
    }

    getFilteredData({ startDate, endDate }) {
        let { data } = this.props;
        if (startDate) {
            data = data.filter(log => {
                return startDate.startOf('day').diff(moment(log.timeLogged).startOf('day'), 'days') <= 0;
            });
        }

        if (endDate) {
            data = data.filter(log => {
                return endDate.startOf('day').diff(moment(log.timeLogged).startOf('day'), 'days') >= 0;
            });
        }

        return data;
    }

    formatToDate(day) {
        return day.format('DD-MM-YYYY');
    }

    onDatesChange({ startDate, endDate }) {
        this.setState({ startDate, endDate });
        this.props.onChange(this.getFilteredData({ startDate, endDate }));
    }

	render() {
        let { data, resident } = this.props;
        const { categoryValue, itemValue } = this.state;
        const items = this.groupLogs(data, 'item');
        const categories = this.groupLogs(data, 'category');

        const {
            startDate,
            endDate,
            date,
            focused,
        } = this.state;


        const today = moment();
        const datesWithLogs = _.chain(data).map(day => this.formatToDate(moment(day.timeLogged))).uniq().value();

        const isDayBlocked = day => {
            return !_.includes(datesWithLogs, this.formatToDate(day));
        };

		return (
			<DateRangePicker
                numberOfMonths={2}
                isOutsideRange={isDayBlocked}
                hideKeyboardShortcutsPanel={true}
                showClearDates={true}
                autoFocusEndDate={false}
                initialVisibleMonth={() => moment().subtract(1, 'months')}
                startDate={this.state.startDate}
                startDateId="start_date_id"
                endDate={this.state.endDate}
                endDateId="end_date_id"
                displayFormat="MMM D"
                onDatesChange={({ startDate, endDate }) => this.onDatesChange({ startDate, endDate })} // PropTypes.func.isRequired,
                focusedInput={focused}
                onFocusChange={focused => this.setState({ focused })}
                minimumNights={0}
            />
		)
	}
}

LmcLogFilter.propTypes = {
    data: PropTypes.array.isRequired,
    resident: PropTypes.object.isRequired,
    onChange: PropTypes.func,
};

const styles = {
	filterContainer: {
		paddingBottom: 20,
    },
}

export default LmcLogFilter;

/*
<div className="four columns">
    <Form layout="inline">
        <FormLabel> 
            Category
        </FormLabel>
        <FormSelect options={categories} onChange={e => this.filterByCategory(e, categories)} />
        {<FormSelect>{categories.map(opt => (
            <option key={opt.value} value={opt.value} onClick={this.filterByCategory}>
                {opt.label}
            </option>
        ))}
        </FormSelect>}
    </Form>
</div>
*/