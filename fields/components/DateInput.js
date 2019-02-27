import moment from 'moment';
import React from 'react';
import { findDOMNode } from 'react-dom';
import Cleave from 'cleave.js/react';
import DayPicker from 'react-day-picker';
import Popout from '../../admin/client/App/shared/Popout';
import styles from '../../admin/client/App/elemental/FormInput/styles';
import { css, StyleSheet } from 'aphrodite/no-important';

let lastId = 0;

const classes = StyleSheet.create(styles);
const FORMAT = 'DD-MM-YYYY'

module.exports = React.createClass({
	displayName: 'DateInput',
	propTypes: {
		className: React.PropTypes.string,
		name: React.PropTypes.string,
		onChange: React.PropTypes.func.isRequired,
		path: React.PropTypes.string,
		value: React.PropTypes.string,
	},
	getInitialState () {
		const id = ++lastId;
		let month = new Date();
		const { value } = this.props;
		if (moment(value, FORMAT, true).isValid()) {
			month = moment(value, FORMAT).toDate();
		}
		return {
			id: `_DateInput_${id}`,
			month: month,
			pickerIsOpen: false,
			inputValue: value,
		};
	},
	componentDidMount () {
		this.showCurrentMonth();
	},
	componentWillReceiveProps: function (newProps) {
		if (newProps.value === this.props.value) return;
		this.setState({
			month: moment(newProps.value, FORMAT).toDate(),
			inputValue: newProps.value,
		}, this.showCurrentMonth);
	},
	focus () {
		if (!this.refs.input) return;
		findDOMNode(this.refs.input).focus();
	},
	handleInputChange (e) {
		const { value } = e.target;
		this.setState({ inputValue: value }, this.showCurrentMonth);
	},
	handleKeyPress (e) {
		if (e.key === 'Enter') {
			e.preventDefault();
			// If the date is strictly equal to the format string, dispatch onChange
			if (moment(this.state.inputValue, FORMAT, true).isValid()) {
				this.props.onChange({ value: this.state.inputValue });
			// If the date is not strictly equal, only change the tab that is displayed
			} else if (moment(this.state.inputValue, FORMAT).isValid()) {
				this.setState({
					month: moment(this.state.inputValue, FORMAT).toDate(),
				}, this.showCurrentMonth);
			}
		}
	},
	handleDaySelect (e, date, modifiers) {
		if (modifiers && modifiers.disabled) return;

		var value = moment(date).format(FORMAT);

		this.props.onChange({ value });
		this.setState({
			pickerIsOpen: false,
			month: date,
			inputValue: value,
		});
	},
	showPicker () {
		this.setState({ pickerIsOpen: true }, this.showCurrentMonth);
	},
	showCurrentMonth () {
		if (!this.refs.picker) return;
		this.refs.picker.showMonth(this.state.month);
	},
	handleFocus (e) {
		if (this.state.pickerIsOpen) return;
		this.showPicker();
	},
	handleCancel () {
		this.setState({ pickerIsOpen: false });
	},
	handleBlur (e) {
		let rt = e.relatedTarget || e.nativeEvent.explicitOriginalTarget;
		if (!this.refs.popout) {
			return
		}
		const popout = this.refs.popout.getPortalDOMNode();
		while (rt) {
			if (rt === popout) return;
			rt = rt.parentNode;
		}
		this.setState({
			pickerIsOpen: false,
		});
	},

	render () {
		const selectedDay = this.props.value;
		// react-day-picker adds a class to the selected day based on this
		const modifiers = {
			selected: (day) => moment(day).format(FORMAT) === selectedDay,
		};

		return (
			<div className={this.props.className || ''}>
				<Cleave
					className={css(classes.FormInput)}
					id={this.state.id}
					name={this.props.name}
					onChange={this.handleInputChange}
					onFocus={this.handleFocus}
					onBlur={this.handleBlur}
					onKeyPress={this.handleKeyPress}
					options={{
						date: true,
						datePattern: ['d', 'm', 'Y']
					}}
					placeholder={FORMAT}
					ref="input"
					value={this.state.inputValue}
				/>
				{ this.props.name !== 'dateOfBirth'
					? <Popout
						isOpen={this.state.pickerIsOpen}
						onCancel={this.handleCancel}
						ref="popout"
						relativeToID={this.state.id}
						width={260}
						>
						<DayPicker
							modifiers={modifiers}
							onDayClick={this.handleDaySelect}
							ref="picker"
							tabIndex={-1}
						/>
					</Popout> : null }
			</div>
		);
	},
});
