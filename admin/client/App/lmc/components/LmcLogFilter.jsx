/*
React Dates doc: 
http://airbnb.io/react-dates/?selectedKind=SingleDatePicker%20%28SDP%29&selectedStory=default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
*/

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';


class LmcLogFilter extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            // categoryValue: 0,
            // itemValue: 0,
            startDate: props.from || null,
            endDate: props.to || null,
            date: null,
            focused: false,
        };

        // this.filterByItem = this.filterByItem.bind(this);
        // this.filterByCategory = this.filterByCategory.bind(this);
        this.onDatesChange = this.onDatesChange.bind(this);
        this.getFilteredData = this.getFilteredData.bind(this);
    }

    // groupLogs(logs, key) {
    //     return [
    //         {
    //             label: "Any",
    //             value: "",
    //         },
    //         ... _(logs)
    //             .groupBy(key)
    //             .map((group, key) => {
    //                 return {
    //                     label: key, // `${} (${group.length} logs)`,
    //                     value: key,
    //                 }
    //             })
    //             .sortBy('label')
    //             .filter(d => d && d.label)
    //             .value(),
    //     ]
    // }

    // filterByItem(value) {
    //     this.setState({
    //         itemValue: target.value,
    //     });
    // }

    // filterByCategory({ target }, categories) {
    //     this.setState({
    //         categoryValue: target.value, // _.findIndex(categories, {value: target.value}) || 0,
    //     });
    // }

    getFilteredData (logs, { startDate, endDate }) {
        let { data } = this.props;

        // Block after
        if (startDate) {
            data = data.filter(log => {
                return startDate.startOf('day').diff(moment(log.timeLogged).startOf('day'), 'days') <= 0;
            });
        }

        // Block before
        if (endDate) {
            data = data.filter(log => {
                return endDate.startOf('day').diff(moment(log.timeLogged).startOf('day'), 'days') >= 0;
            });
        }

        return data;
    }

    formatToDate (day) {
        return day.format('DD-MM-YYYY');
    }

    onDatesChange ({ startDate, endDate }) {
        const { maximumNights, logs } = this.props;
        let end = endDate && (endDate.diff(startDate, 'days') > maximumNights)
            ? moment(startDate).add(maximumNights - 1, 'days')
            : endDate;

        this.setState({ startDate, endDate: end });

        if (this.props.onChange) {
            this.props.onChange(this.getFilteredData(logs, { startDate, endDate: end }));
        };
        if (this.props.onNewDates) {
            this.props.onNewDates({ startDate, endDate: end });
        };
    }

    render () {
        const { data, blockDatesWithNoData, blockFuture, maximumNights } = this.props;
        // const { categoryValue, itemValue } = this.state;
        // const items = this.groupLogs(data, 'item');
        // const categories = this.groupLogs(data, 'category');

        const today = moment();
        const datesWithLogs = _.chain(data)
            .map(day => this.formatToDate(moment(day.timeLogged)))
            .uniq()
            .value();

        const isDayBlocked = day => {
            if (blockFuture && day.isAfter(today)) {
                return true;
            };

            if (maximumNights
                && this.state.startDate
                && day.isAfter(moment(this.state.startDate).add(maximumNights - 1, 'days'))) {
                return true;
            }

            if (maximumNights
                && !this.state.startDate
                && this.state.endDate
                && day.isBefore(moment(this.state.endDate).subtract(maximumNights, 'days'))) {
                return true;
            }

            return blockDatesWithNoData && !_.includes(datesWithLogs, this.formatToDate(day));
        };

        return (
            <DateRangePicker
                numberOfMonths={2}
                isOutsideRange={isDayBlocked}
                hideKeyboardShortcutsPanel
                showClearDates
                autoFocusEndDate={false}
                initialVisibleMonth={() => moment().subtract(1, 'months')}
                startDate={this.state.startDate}
                startDateId="start_date_id"
                endDate={this.state.endDate}
                endDateId="end_date_id"
                displayFormat="MMM D"
                onDatesChange={({ startDate, endDate }) => this.onDatesChange({ startDate, endDate })} // PropTypes.func.isRequired,
                focusedInput={this.state.focused}
                onFocusChange={focused => this.setState({ focused })}
                minimumNights={0}
            />
        );
    }
}

LmcLogFilter.propTypes = {
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    resident: PropTypes.object.isRequired,
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