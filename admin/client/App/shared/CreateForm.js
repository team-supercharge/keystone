/**
 * The form that's visible when "Create <ItemName>" is clicked on either the
 * List screen or the Item screen
 */

import React from 'react';
import assign from 'object-assign';
import vkey from 'vkey';
import AlertMessages from './AlertMessages';
import { Fields } from 'FieldTypes';
import InvalidFieldType from './InvalidFieldType';
import { Button, Form, Modal } from '../elemental';
import Swal from 'sweetalert2'


const CreateForm = React.createClass({
	displayName: 'CreateForm',
	propTypes: {
		err: React.PropTypes.object,
		isOpen: React.PropTypes.bool,
		list: React.PropTypes.object,
		onCancel: React.PropTypes.func,
		onCreate: React.PropTypes.func,
		submitLabel: React.PropTypes.string,
	},
	getDefaultProps () {
		return {
			err: null,
			isOpen: false,
		};
	},
	getInitialState () {
		// Set the field values to their default values when first rendering the
		// form. (If they have a default value, that is)
		var values = {};
		Object.keys(this.props.list.fields).forEach(key => {
			var field = this.props.list.fields[key];
			var FieldComponent = Fields[field.type];
			values[field.path] = FieldComponent.getDefaultValue(field);
		});

		return {
			values: values,
			alerts: {},
			isSubmitting: false
		};
	},
	componentDidMount () {
		document.body.addEventListener('keyup', this.handleKeyPress, false);
	},
	componentWillUnmount () {
		document.body.removeEventListener('keyup', this.handleKeyPress, false);
	},
	handleKeyPress (evt) {
		if (vkey[evt.keyCode] === '<escape>') {
			this.props.onCancel();
		}
	},
	// Handle input change events
	handleChange (event) {
		const field = this.props.list.fields[event.path];

		var values = assign({}, this.state.values);
		values[event.path] = event.value;
		this.setState({
			values: values,
		});
	},

	prefillValues(values) {
		this.setState({ values: {
			...this.state.values,
			...values
		}});
	},

	// Set the props of a field
	getFieldProps (field) {
		var props = assign({}, field);
		props.value = this.state.values[field.path];
		props.values = this.state.values;
		props.onChange = this.handleChange;
		props.mode = 'create';
		props.key = field.path;

		if (field.prefill) {
			props.prefillValues = this.prefillValues;
		}

		if (this.props.prefillPath && field.path === this.props.prefillPath) {
			props.value = this.props.prefillValue;
		}

		return props;
	},
	// Create a new item when the form is submitted
	submitForm (event) {
		event.preventDefault();
		this.setState({ isSubmitting: true })
		const createForm = event.target;
		const formData = new FormData(createForm);
		this.props.list.createItem(formData, (err, data) => {
			if (data) {
				const Toast = Swal.mixin({
					toast: true,
					position: 'top',
					iconColor: '#9DD5C0',
					showConfirmButton: false,
					timer: 3000
				})

				Toast.fire({
					type: 'success',
					title: 'Added a ' + this.props.list.singular
				})

				if (this.props.onCreate) {
					this.props.onCreate(data);
				} else {
					// Clear form
					this.setState({
						values: {},
						alerts: {
							success: {
								success: 'Item created',
							},
						},
						isSubmitting: false
					});
				}
			} else {
				if (!err) {
					err = {
						error: 'connection error',
					};
				}
				// If we get a database error, show the database error message
				// instead of only saying "Database error"
				if (err.error === 'database error') {
					err.error = err.detail.errmsg;
				}
				this.setState({
					alerts: {
						error: err,
					},
					isSubmitting: false
				});
			}
		});
	},
	// Render the form itself
	renderForm () {
		if (!this.props.isOpen) return;

		var form = [];
		var list = this.props.list;
		var nameField = this.props.list.nameField;
		var focusWasSet;

		// If the name field is an initial one, we need to render a proper
		// input for it
		if (list.nameIsInitial) {
			var nameFieldProps = this.getFieldProps(nameField);
			nameFieldProps.autoFocus = focusWasSet = true;
			if (nameField.type === 'text') {
				nameFieldProps.className = 'item-name-field';
				nameFieldProps.placeholder = nameField.label;
				nameFieldProps.label = '';
			}
			form.push(React.createElement(Fields[nameField.type], nameFieldProps));
		}

		// Render inputs for all initial fields
		Object.keys(list.initialFields).forEach(key => {
			var field = list.fields[list.initialFields[key]];
			// If there's something weird passed in as field type, render the
			// invalid field type component
			if (typeof Fields[field.type] !== 'function') {
				form.push(React.createElement(InvalidFieldType, { type: field.type, path: field.path, key: field.path }));
				return;
			}
			// Get the props for the input field
			var fieldProps = this.getFieldProps(field);
			// If there was no focusRef set previously, set the current field to
			// be the one to be focussed. Generally the first input field, if
			// there's an initial name field that takes precedence.
			if (!focusWasSet) {
				fieldProps.autoFocus = focusWasSet = true;
			}
			form.push(React.createElement(Fields[field.type], fieldProps));
		});

		// https://github.com/sweetalert2/sweetalert2-react-content/blob/master/src/index.js
		return (
			<Form layout="horizontal" onSubmit={this.submitForm}>
				<Modal.Header
					text={'Add a new ' + list.singular}
					showCloseButton
				/>
				<Modal.Body>
					<AlertMessages alerts={this.state.alerts} />
					{form}
				</Modal.Body>
				<Modal.Footer>
					<Button 
						color="success" 
						type="submit" 
						disabled={this.state.isSubmitting}
						data-button-type="submit">
						{ this.props.submitLabel || 'Add' }
					</Button>
					<Button
						variant="link"
						color="cancel"
						data-button-type="cancel"
						onClick={this.props.onCancel}
					>
						Cancel
					</Button>
				</Modal.Footer>
			</Form>
		);
	},
	render () {
		return (
			<Modal.Dialog
				isOpen={this.props.isOpen}
				onClose={this.props.onCancel}
				backdropClosesModal
			>
				{this.renderForm()}
			</Modal.Dialog>
		);
	},
});

module.exports = CreateForm;
