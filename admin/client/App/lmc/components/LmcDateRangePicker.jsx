/*
React Dates doc: 
http://airbnb.io/react-dates/?selectedKind=SingleDatePicker%20%28SDP%29&selectedStory=default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
*/

import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { DateRangePicker } from 'react-dates'
import moment from 'moment'


class LmcDateRangePicker extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            focused: false,
        }
        this.isDayBlocked = this.isDayBlocked.bind(this)
        this.onDatesChange = this.onDatesChange.bind(this)
    }

    onDatesChange ({ startDate, endDate }) {
        const { maximumNights } = this.props
        // really needed???
        let end = endDate && (endDate.diff(startDate, 'days') > maximumNights)
            ? moment(startDate).add(maximumNights - 1, 'days')
            : endDate

        this.props.onChange({ startDate, endDate: end })
    }

    isDayBlocked(day) {

        const {
            startDate,
            endDate,
        } = this.state

        const {
            isDayBlocked,
            blockFuture,
            maximumNights
        } = this.props

        const today = moment().endOf('day')

        if (blockFuture && day.isAfter(today)) {
            return true
        }

        if (maximumNights
            && startDate
            && day.isAfter(moment(startDate).add(maximumNights - 1, 'days'))) {
            return true
        }

        if (maximumNights
            && !startDate
            && endDate
            && day.isBefore(moment(endDate).subtract(maximumNights, 'days'))) {
            return true
        }

        if (isDayBlocked) {
            return isDayBlocked(day)
        }

        return false
    }

    render () {
        const {
            startDate,
            endDate
        } = this.props
        const { focused } = this.state

        return (
            <DateRangePicker
                numberOfMonths={2}
                isOutsideRange={this.isDayBlocked}
                hideKeyboardShortcutsPanel
                showClearDates
                autoFocusEndDate={false}
                initialVisibleMonth={() => moment().subtract(1, 'months')}
                startDate={startDate}
                startDateId="start_date_id"
                endDate={endDate}
                endDateId="end_date_id"
                displayFormat="MMM D"
                onDatesChange={this.onDatesChange}
                focusedInput={focused}
                onFocusChange={focused => this.setState({ focused })}
                minimumNights={0}
            />
        )
    }
}

LmcDateRangePicker.propTypes = {
    onChange: PropTypes.func,
    maximumNights: PropTypes.number,
    blockFuture: PropTypes.bool,
    isDayBlocked: PropTypes.func
}

export default LmcDateRangePicker
