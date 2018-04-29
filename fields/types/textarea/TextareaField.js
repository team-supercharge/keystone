import Field from '../Field';
import React from 'react';
import { FormInput } from '../../../admin/client/App/elemental';

module.exports = Field.create({
	displayName: 'TextareaField',
	statics: {
		type: 'Textarea',
	},
	renderValue () {
		const { height } = this.props;

		const styles = {
			height: height,
			whiteSpace: 'pre-wrap',
			overflowY: 'auto',
		};
		return (
			<FormInput multiline noedit style={styles}>{this.props.value}</FormInput>
		);
	},
	renderField () {
		const { height, path, style, value, note } = this.props;
		const styles = {
			height: height,
			lineHeight: '22px',
			paddingTop: 7,
			...style,
		};
		let _note = note ? note.replace('<p>', '').replace('</p>', '') : null;
		return (
			<FormInput
				autoComplete="off"
				multiline
				placeholder={_note}
				name={this.getInputName(path)}
				onChange={this.valueChanged}
				ref="focusTarget"
				style={styles}
				value={value}
			/>
		);
	},
});
