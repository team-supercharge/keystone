import React from 'react';
import Field from '../Field';
import uuid from 'uuid/v4';
import Collapsible from 'react-collapsible';
import { map, set } from 'lodash';
import Select from 'react-select';
import { Glyph, Button, FormInput } from '../../../admin/client/App/elemental';

module.exports = Field.create({
	displayName: 'JSONArrayField',
	statics: {
		type: 'JSONArray',
	},
	renderValue () {
		return <div>Rending da value {this.props.value}</div>;
	},
	renderField () {
		return (<div>
			{(this.props.value || []).map((node, idx) => (
				<Collapsible key={idx} trigger={this.renderNodeHeader(node)}>
					{this.renderNode(idx, node)}
				</Collapsible>
			))}
			<Button onClick={this.addNewItem}><Glyph name="plus" />Add new</Button>
		</div>);
	},
	renderNodeHeader (node) {
		return (<h2>{node.question || 'Untitled'}</h2>);
	},
	renderNode (idx, node) {
		return (<div>
			{map(this.props.jsonObjectSchema, (fieldOptions, fieldName) => (
				<div key={`wrap-${idx}-${fieldName}`}>
					<label htmlFor={this.getFormFieldName(idx, fieldName)}>
						{fieldOptions.label || fieldName}
					</label>
					{this.renderSubField(idx, fieldName, fieldOptions, node)}
				</div>
			))}
		</div>);
	},
	renderSubField (idx, fieldName, fieldOptions, node = {}) {
		const name = this.getFormFieldName(idx, fieldName);
		const key = `json-array-field-input-${idx}-${fieldName}`;
		switch (fieldOptions.type) {
			case 'text':
			case 'number':
				return (
					<FormInput
						type={fieldOptions.type}
						key={key}
						autoComplete="off"
						name={name}
						value={node[fieldName]}
						ref="focusTarget"
						onChange={event => {
							this.valueChanged(idx, fieldName, `${event.target.value}`)
						}}
					/>);
			case 'checkbox':
				return (
					<input
						type="checkbox"
						key={key}
						name={name}
						checked={node[fieldName]}
						ref="focusTarget"
						onChange={event => {
							this.valueChanged(idx, fieldName, event.target.checked);
						}}
					/>
				);
			case 'select':
				return (
					<Select
						key={key}
						simpleValue
						name={name}
						value={node[fieldName] || fieldOptions.options[0].value}
						options={fieldOptions.options}
						onChange={newSubValue =>
							this.valueChanged(idx, fieldName, newSubValue)}
					/>);
			case 'id':
				return;
			default:
				throw new Error(`Cannot render sub field ${fieldName} (type: ${fieldOptions.type})`)

		}
	},
	getFormFieldName(idx, fieldName) {
		return `${this.props.path}[${idx}][${fieldName}]`;
	},
	valueChanged (idx, fieldName, newSubValue) {
		const value = this.props.value.slice();
		if (typeof value[idx] !== 'object') value[idx] = {};
		set(value[idx], fieldName, newSubValue);
		this.props.onChange({
			path: this.props.path,
			value,
		});
	},
	addNewItem () {
		this.props.onChange({
			path: this.props.path,
			value: this.props.value.concat([{
				id: uuid(),
			}]),
		});
	},
});
