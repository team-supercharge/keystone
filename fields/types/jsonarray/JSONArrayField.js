import React from 'react';
import Field from '../Field';
import uuidV4 from 'uuid/v4';
import Collapsible from 'react-collapsible';
import { map, set, compact, max, startCase } from 'lodash';
import Select from 'react-select';
import { Glyph, Button, FormInput, FormLabel, Modal } from '../../../admin/client/App/elemental';
const ROOT_PARENT_ID = 'ROOT';

import { StyleSheet, css } from 'aphrodite/no-important';

const classes = StyleSheet.create({
	wholeFieldWrapper: {
		borderColor: '#dddddd',
		paddingBottom: '.5em',
	},
	wholeFieldLabel: {
		border: '2px solid #dedede',
		borderBottom: 'none',
		display: 'block',
		borderTopLeftRadius: 3,
		borderTopRightRadius: 3,
		backgroundColor: '#f5f5f5',
		padding: '10px 15px',
	},
	wholeFieldOuter: {
		border: '2px solid #dedede',
		borderTop: 'none',
		borderBottomLeftRadius: 3,
		borderBottomRightRadius: 3,
	},
	wholeFieldInner: {
		padding: '10px',
	},
	wrap: {
		display: 'block',
		minHeight: 45,
	},
	subfieldLabel: {
		float: 'left',
		clear: 'left',
		maxWidth: '40%',
	},
	subfield: {
		float: 'right',
		width: '59%',
	},
});

module.exports = Field.create({
	displayName: 'subfield',
	statics: {
		type: 'JSONArray',
	},
	renderValue () {
		return <pre>{JSON.stringify(this.props.value, null, 2)}</pre>;
	},
	getInitialState: () => ({
		nodeToClone: null,

		nodeToRemove: null
	}),
	renderField () {
		const value = this.props.value && this.sanitizeValue(this.props.value);
		return (<div>
			{this.renderConfirmDeletionModal()}
			{this.renderCloneModal()}
			{(value || []).map((node, idx) => (
				<Collapsible
					className={css(classes.wholeFieldWrapper)}
					openedClassName={css(classes.wholeFieldWrapper)}
					triggerClassName={css(classes.wholeFieldLabel)}
					triggerOpenedClassName={css(classes.wholeFieldLabel)}
					contentOuterClassName={css(classes.wholeFieldOuter)}
					contentInnerClassName={css(classes.wholeFieldInner)}
					key={`json-array-node-${node.id}`}
					trigger={this.renderNodeHeader(node)}>
					{this.renderNode(idx, node)}
					<Button color="success" onClick={() => this.onClickClone(node)}>
						<Glyph name="repo-clone" />
						&nbsp;
						Clone this node
					</Button>
					&nbsp;
					<Button color="danger" onClick={() => this.onClickDelete(node)}>
						<Glyph name="trashcan" />
						&nbsp;
						Remove with descendants
					</Button>
				</Collapsible>
			))}
			<Button color="primary" onClick={this.addNewItem}>
				<Glyph name="plus" />
				&nbsp;
				Add new node
			</Button>
		</div>);
	},
	renderNodeHeader (node) {
		return (<strong>{node.name || node.question || 'Untitled'}</strong>);
	},
	renderNode (idx, node) {
		return (<div>
			{map(this.props.jsonObjectSchema, (fieldOptions, fieldName) => {
				const isVisible = fieldOptions.type !== 'id';
				return (
					<div key={`wrap-${idx}-${fieldName}`} className={isVisible && css(classes.wrap)}>
						{isVisible && (
							<FormLabel
								className={css(classes.subfieldLabel)}
								htmlFor={this.getFormFieldName(idx, fieldName)}>
								{fieldOptions.label || startCase(fieldName)}
							</FormLabel>
						)}
						{this.renderSubField(idx, fieldName, fieldOptions, node)}
					</div>
				);
			})}
		</div>);
	},
	renderSubField (idx, fieldName, fieldOptions, node = {}) {
		const name = this.getFormFieldName(idx, fieldName);
		const key = `json-array-field-input-${idx}-${fieldName}`;
		switch (fieldOptions.type) {
			case 'id':
				return (
					<input
						type="hidden"
						name={name}
						key={key}
						value={node[fieldName]}
					/>);
			case 'text':
			case 'number':
				return (
					<FormInput
						className={css(classes.subfield)}
						type={fieldOptions.type}
						key={key}
						autoComplete="off"
						name={name}
						value={node[fieldName]}
						placeholder={fieldOptions.placeholder || ''}
						ref="focusTarget"
						onChange={event => {
							this.valueChanged(idx, fieldName, `${event.target.value}`)
						}}
					/>);
			case 'checkbox':
				return (
					<input
						className={css(classes.subfield)}
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
						className={css(classes.subfield)}
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
				for (let node of this.props.value) {
					if (node && !rejectedIds.includes(node.id)) {
						options.push({ value: node.id, label: node.name || this.getName(node) });
					}
				}
				return (
					<Select
						className={css(classes.subfield)}
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
	renderConfirmDeletionModal () {
		const nodeName = this.state.nodeToRemove && this.getName(this.state.nodeToRemove);
		return (
			<Modal.Dialog isOpen={!!this.state.nodeToRemove} onClose={this.handleCloseConfirmDeletionModal}>
				<Modal.Header text={'Delete node and all its descendants?'} />
				<Modal.Body>
					This operation will remove "{nodeName}" and all its descendants.
					This will only be persisted after you click "Save".
					The following node(s) will be removed:
					{nodeName && <ul>
						<li>{nodeName}</li>
						{this.getDescendantsOf(this.state.nodeToRemove).map(descendantId => (
							<li>{this.getName(this.props.value.find(({id}) => id === descendantId))}</li>
						))}
					</ul>}
					Are you sure?
				</Modal.Body>
				<Modal.Footer>
					<Button color="warning" onClick={this.handleCloseConfirmDeletionModal}>
						<Glyph name="x" />
						&nbsp;
						Cancel
					</Button>
					&nbsp;
					<Button color="danger" onClick={() => this.deleteItemWithDescendants(this.state.nodeToRemove)}>
						<Glyph name="trashcan"/>
						&nbsp;
						Remove with descendants
					</Button>
				</Modal.Footer>

			</Modal.Dialog>
		);
	},
	renderCloneModal () {
		const nodeName = this.state.nodeToClone && this.getName(this.state.nodeToClone);
		return (
			<Modal.Dialog isOpen={!!this.state.nodeToClone} onClose={this.handleCloseCloneModal}>
				<Modal.Header text={'Clone item'} />
				<Modal.Body>
					You are cloning "{nodeName}". Do you also want to clone all it's descendants?
					The following children can also be cloned:
					{nodeName && <ul>
						{this.getDescendantsOf(this.state.nodeToClone).map(descendantId => (
							<li>
								{this.getName(this.props.value.find(({id}) => id === descendantId))}
							</li>
						))}
					</ul>}
					Do you want to clone all descendants or only this item?
				</Modal.Body>
				<Modal.Footer>
					<Button color="warning" onClick={this.handleCloseCloneModal}>
						<Glyph name="x" />
						&nbsp;
						Cancel
					</Button>
					&nbsp;
					<Button color="primary" onClick={() => this.cloneItem(this.state.nodeToClone)}>
						<Glyph name="dash" />
						&nbsp;
						Only clone this node
					</Button>
					&nbsp;
					<Button color="primary" onClick={() => this.cloneItemWithDescendants(this.state.nodeToClone)}>
						<Glyph name="list-unordered" />
						&nbsp;
						Clone with all descendants
					</Button>
				</Modal.Footer>
			</Modal.Dialog>
		);
	},
	onClickClone (node) {
		this.setState({ nodeToClone: node });
	},
	handleCloseCloneModal () {
		this.setState({ nodeToClone: null });
	},
	onClickDelete (node) {
		this.setState({ nodeToRemove: node });
	},
	handleCloseConfirmDeletionModal () {
		this.setState({ nodeToRemove: null });
	},
	cloneItem (node) {
		this.addNewItem(node, this.props.value.indexOf(node));
	},
	cloneItemWithDescendants (node) {
		const sourceIds = [node.id].concat(this.getDescendantsOf(node));
		const sources = this.props.value.filter(({ id }) => sourceIds.includes(id));
		const afterIndex = max(sources.map(source => this.props.value.indexOf(source)));
		const cloneMap = {};
		const clones = sources.map(source => {
			const id = cloneMap[source.id] = uuidV4();
			return {
				...source,
				id,
				sourceId: source.id,
				question: `Copy of ${source.question}`,
			};
		}).map(clone => {
			clone.parent = cloneMap[clone.parent] || clone.parent;
			return clone;
		});

		this.addNewItems(clones, afterIndex);
		this.handleCloseCloneModal();
	},
	deleteItemWithDescendants (node) {
		const deleteIds = [node.id].concat(this.getDescendantsOf(node));
		this.props.onChange({
			path: this.props.path,
			value: this.sanitizeValue(this.props.value.filter((node) => !deleteIds.includes(node.id || node._id))),
		});
		this.handleCloseConfirmDeletionModal();
	},
	getDescendantsOf (currentNode) {
		return this.props.value.reduce((ids, otherNode) => {
			if (otherNode.parent === currentNode.id && currentNode !== otherNode) {
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
		this.props.onChange({
			path: this.props.path,
			value: this.sanitizeValue(value),
		});
	},
	sanitizeValue (value) {
		return compact(value.map(node => {
			return Object.assign({}, node || { id: uuidV4()}, {
				name: this.getName(node),
			});
		}));
	},
	addNewItems (newItems, afterIndex) {
		this.props.onChange({
			path: this.props.path,
			value: [
				...this.props.value.slice(0, afterIndex),
				...newItems,
				...this.props.value.slice(afterIndex + 1),
			]
		});

	},
	addNewItem (node = { name: `New step` }, afterIndex) {
		const id = uuidV4();
		const newItem = {
			...node,
			id,
			order: this.props.value.length + 1,
		};
		this.props.onChange({
			path: this.props.path,
			value: afterIndex ? [
				...this.props.value.slice(0, afterIndex),
				newItem,
				...this.props.value.slice(afterIndex + 1),
			] : this.props.value.concat(newItem),
		});
		this.handleCloseCloneModal();
		return id;
	},
	getName (node) {
		node = node || {};
		const parent = this.props.value.find(other => other && other.id === node.parent);
		const nodeName = node.question && `${node.question} (${node.answer || startCase(node.type)})`;
		return `${parent && `${this.getName(parent)} - ` || ''}${nodeName || 'Untitled'}`;
	},
});
