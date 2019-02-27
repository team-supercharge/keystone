/*
React Dates doc: 
http://airbnb.io/react-dates/?selectedKind=SingleDatePicker%20%28SDP%29&selectedStory=default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
*/

import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { DateRangePicker } from 'react-dates'
import moment from 'moment'


class LmcLogFilter extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            startDate: props.from || null,
            endDate: props.to || null,
            date: null,
            focused: false,
        }
        this.onDatesChange = this.onDatesChange.bind(this)
        this.getFilteredData = this.getFilteredData.bind(this)
    }

    getFilteredData (logs, { startDate, endDate }) {
        let { data } = this.props

        // Block after
        if (startDate) {
            data = data.filter(log => {
                return startDate.startOf('day').diff(moment(log.timeLogged).startOf('day'), 'days') <= 0
            })
        }

        // Block before
        if (endDate) {
            data = data.filter(log => {
                return endDate.startOf('day').diff(moment(log.timeLogged).startOf('day'), 'days') >= 0
            })
        }

        return data
    }

    formatToDate (day) {
        return day.format('DD-MM-YYYY')
    }

    onDatesChange ({ startDate, endDate }) {
        const { maximumNights, logs } = this.props
        let end = endDate && (endDate.diff(startDate, 'days') > maximumNights)
            ? moment(startDate).add(maximumNights - 1, 'days')
            : endDate

        this.setState({ startDate, endDate: end })

        if (this.props.onChange) {
            this.props.onChange(this.getFilteredData(logs, { startDate, endDate: end }))
        }
        if (this.props.onNewDates) {
            this.props.onNewDates({ startDate, endDate: end })
        }
    }

    isDayBlocked(day, datesWithLogs) {
        const {
            startDate,
            endDate,
        } = this.state

        const {
            blockDatesWithNoData,
            blockFuture,
            maximumNights
        } = this.props

        const today = moment()

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

        if (blockDatesWithNoData && datesWithLogs) {
            return !_.includes(datesWithLogs, this.formatToDate(day))
        }

        return false
    }

    render () {
        const { data } = this.props

        let datesWithLogs = _.chain(data)
            .map(day => this.formatToDate(moment(day.timeLogged)))
            .uniq()
            .value()

        return (
            <DateRangePicker
                numberOfMonths={2}
                isOutsideRange={day => this.isDayBlocked(day, datesWithLogs)}
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
        )
    }
}

LmcLogFilter.propTypes = {
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    maximumNights: PropTypes.number,
    blockFuture: PropTypes.bool,
    blockDatesWithNoData: PropTypes.bool
}

export default LmcLogFilter
