import Field from '../Field';
import React, { PropTypes } from 'react';
import { FormInput } from '../../../admin/client/App/elemental';

/*
	TODO:
	- gravatar
	- validate email address
 */

module.exports = Field.create({
	displayName: 'EmailField',
	propTypes: {
		path: PropTypes.string.isRequired,
		value: PropTypes.string,
	},
	statics: {
		type: 'Email',
	},
	renderField () {
		let _note = this.props.note ? this.props.note.replace('<p>', '').replace('</p>', '') : null;
		return (
			<FormInput
				name={this.getInputName(this.props.path)}
				ref="focusTarget"
				value={this.props.value}
				onChange={this.valueChanged}
				autoComplete="off"
				placeholder={_note}
				type="email"
			/>
		);
	},
	renderValue () {
		let _note = this.props.note ? this.props.note.replace('<p>', '').replace('</p>', '') : null;
		return this.props.value ? (
			<FormInput
				noedit
				component="a"
				placeholder={_note}
				href={'mailto:' + this.props.value}>
				{this.props.value}
			</FormInput>
		) : (
			<FormInput noedit />
		);
	},
});
