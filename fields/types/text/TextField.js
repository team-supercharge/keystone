import Field from '../Field';
import { FormInput } from '../../../admin/client/App/elemental';
import React from 'react';


module.exports = Field.create({
	displayName: 'TextField',
	statics: {
		type: 'Text',
	},
	renderValue () {
		const { style } = this.props;
		return (
			<FormInput noedit style={style}>{this.props.value}</FormInput>
		);
	},
	renderField () {
		const { path, style, value, note } = this.props;
		let _note = note ? note.replace('<p>', '').replace('</p>', '') : null;
		return (
			<FormInput
				autoComplete="off"
				placeholder={_note}
				className="lmc-test"
				name={this.getInputName(path)}
				onChange={this.valueChanged}
				ref="focusTarget"
				style={style}
				value={value}
			/>
		);
	},
});
