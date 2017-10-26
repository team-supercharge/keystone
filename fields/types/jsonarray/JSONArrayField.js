import React from 'react';
import Field from '../Field';
import uuidV4 from 'uuid/v4';
import Collapsible from 'react-collapsible';
import { map, set } from 'lodash';
import Select from 'react-select';
import { Glyph, Button, FormInput } from '../../../admin/client/App/elemental';
const ROOT_PARENT_ID = 'ROOT';
module.exports = Field.create({
	displayName: 'JSONArrayField',
	statics: {
		type: 'JSONArray',
	},
	renderValue () {
		return <div>Rending da value {this.props.value}</div>;
	},
	renderField () {
		this.sanitizeValue(this.props.value);
		return (<div>
			{(this.props.value || []).map((node, idx) => (
				<Collapsible key={idx} trigger={this.renderNodeHeader(node)}>
					{this.renderNode(idx, node)}
				</Collapsible>
			))}
			<Button onClick={this.addNewItem}><Glyph name="plus" />&nbsp;Add new node</Button>
		</div>);
	},
	renderNodeHeader (node) {
		return (<h2>{node.name || node.question || 'Untitled'}</h2>);
	},
	renderNode (idx, node) {
		return (<div>
			{map(this.props.jsonObjectSchema, (fieldOptions, fieldName) => (
				<div key={`wrap-${idx}-${fieldName}`}>
					{fieldOptions.type !== 'id' && (
						<label htmlFor={this.getFormFieldName(idx, fieldName)}>
							{fieldOptions.label || fieldName}
						</label>
					)}
					{this.renderSubField(idx, fieldName, fieldOptions, node)}
				</div>
			))}
		</div>);
	},
	renderSubField (idx, fieldName, fieldOptions, node = {}) {
		const name = this.getFormFieldName(idx, fieldName);
		const key = `json-array-field-input-${idx}-${fieldName}`;
		switch (fieldOptions.type) {
			case 'id':
				return <input type="hidden" name={name} key={key} value={node[fieldName]}/>;
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
			case 'parent':
				const descendantIds = [node.id].concat(this.getDescendantsOf(node));
				const rejectedIds = this.props.value.reduce((ids, otherNode) => {
					if (descendantIds.includes(otherNode.id)) ids.push(otherNode.id);
					return ids;
				}, []);
				const options = [];
				const rootElement = node.parent === ROOT_PARENT_ID ? node :
					this.props.value.find(node => node.parent === ROOT_PARENT_ID);
				if (!rootElement || rootElement === node) {
					options.push({
						value: ROOT_PARENT_ID,
						label: 'This item (root element)',
					});
				}
				for (let { id, name: label } of this.props.value) {
					if (!rejectedIds.includes(id)) {
						options.push({ value: id, label });
					}
				}
				console.log('options', options);
				return (
					<Select
						key={key}
						simpleValue
						name={name}
						value={node[fieldName]}
						options={options}
						onChange={newParent =>
							this.valueChanged(idx, fieldName, newParent)}
					/>);
			default:
				throw new Error(`Cannot render sub field ${fieldName} (type: ${fieldOptions.type})`)
		}
	},
	getDescendantsOf (currentNode) {
		return this.props.value.reduce((ids, otherNode) => {
			if (otherNode.parent === currentNode.id) {
				ids.push(otherNode.id);
				ids = ids.concat(this.getDescendantsOf(otherNode));
			}
			return ids;
		}, []);
	},
	getFormFieldName(idx, fieldName) {
		return `${this.props.path}[${idx}][${fieldName}]`;
	},
	valueChanged (idx, fieldName, newSubValue) {
		const value = this.props.value.slice();
		if (typeof value[idx] !== 'object') value[idx] = {};
		set(value[idx], fieldName, newSubValue);
		this.sanitizeValue(value);
		this.props.onChange({
			path: this.props.path,
			value,
		});
	},
	sanitizeValue(value) {
		value.forEach(node => Object.assign(node, {
			name: this.getName(node),
		}));
	},
	addNewItem () {
		this.props.onChange({
			path: this.props.path,
			value: this.props.value.concat({
				id: uuidV4(),
				name: `New step`,
				order: this.props.value.length + 1,
			}),
		});
	},
	getName (node) {
		const parent = this.props.value.find(other => other.id === node.parent);
		return `${parent && `${this.getName(parent)} - ` || ''}${node.question || 'Untitled'}`;
	},
});
