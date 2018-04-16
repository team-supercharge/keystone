/*
React Dates doc: 
http://airbnb.io/react-dates/?selectedKind=SingleDatePicker%20%28SDP%29&selectedStory=default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import FormSelect from '../../../../elemental/FormSelect';
import FormLabel from '../../../../elemental/FormLabel';
import Form from '../../../../elemental/Form';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

class LmcLogFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categoryValue: 0,
            itemValue: 0,
            startDate: null,
            endDate: null,
            date: null,
            focused: false,
        }

        this.filterByItem = this.filterByItem.bind(this);
        this.filterByCategory = this.filterByCategory.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
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

    getFilteredData(date) {
        const { data } = this.props;

        if (date) {
            const filterDate = this.formatToDate(date);
            return data.filter(log => {
                console.log(log.timeLogged, this.formatToDate(moment(log.timeLogged)) === filterDate)
                return this.formatToDate(moment(log.timeLogged)) === filterDate
            });
        } else {
            return data;
        }
    }

    formatToDate(day) {
        return day.format('DD-MM-YYYY');
    }

    onDateChange(date) {
        this.setState({ date });
        this.props.onChange(this.getFilteredData(date));
    }

	render() {
        let { data } = this.props;
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
            if (day > today) return true;
            if (_.includes(datesWithLogs, this.formatToDate(day))) return false;
            return true;
        };

		return (
			<div className="row" style={styles.filterContainer}>
				<div className="six columns">
                    <SingleDatePicker
                        date={date}
                        numberOfMonths={2}
                        initialVisibleMonth={() => moment().subtract(1, 'months')}
                        showClearDate={true}
                        hideKeyboardShortcutsPanel={true}
                        onDateChange={this.onDateChange}
                        isOutsideRange={isDayBlocked}
                        focused={focused}
                        onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired,
                    />
				</div>
				{/* {
                    <div className="six columns">
                        <Form layout="inline">
                            <FormLabel> 
                                Item
                            </FormLabel>
                            <FormSelect options={items} onChange={e => this.filterByItem(e, items)} />
                        </Form>
                    </div>
                } */}
			</div>
		)
	}
}

LmcLogFilter.propTypes = {
    data: PropTypes.array.isRequired,
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