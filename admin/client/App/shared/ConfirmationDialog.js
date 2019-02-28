/**
 * Renders a confirmation dialog modal
 */

import React, { PropTypes } from 'react';
import { Button, Modal, FormInput, FormField } from '../elemental';

class ConfirmationDialog extends React.Component {
	constructor(props) {
		super(props)
	}

	state = {
		deleteText: ''
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	renderDeleteInput() {
		const { confirmationType } = this.props
		return (
			confirmationType === 'danger' ? (
				<div>
					<br />
					<FormField label="Type DELETE to continue" htmlFor="deleteText">
						<FormInput
							autoFocus
							name="deleteText"
							onChange={this.handleChange}
						/>
					</FormField>
				</div>
			) : null
		);
	}

	render() {
		const { 
			body, 
			children, 
			html, 
			cancelLabel, 
			confirmationLabel, 
			confirmationType, 
			isOpen, 
			onCancel, 
			onConfirmation, 
			...props 
		} = this.props;

		if (children && html) {
			console.error('Warning: FormNote cannot render `children` and `html`. You must provide one or the other.');
		}

		const chosenColor = ['danger', 'warning'].includes(confirmationType) ? 'danger' : confirmationType

		return (
			<Modal.Dialog
				backdropClosesModal
				isOpen={isOpen}
				onClose={onCancel}
				width={400}
			>
				{html ? (
					<Modal.Body {...props} dangerouslySetInnerHTML={{ __html: html }} />
				) : (
					<Modal.Body {...props}>
						{children}
						{this.renderDeleteInput()}
					</Modal.Body>
				)}
				<Modal.Footer>
					<Button 
						autoFocus size="small" 
						data-button-type="confirm" 
						color={chosenColor}
						disabled={this.state.deleteText !== 'DELETE' && confirmationType === 'danger'} 
						onClick={onConfirmation}
					>
						{confirmationLabel}
					</Button>
					<Button size="small" data-button-type="cancel" variant="link" color="cancel" onClick={onCancel}>
						{cancelLabel}
					</Button>
				</Modal.Footer>
			</Modal.Dialog>
		);
	}
};

ConfirmationDialog.propTypes = {
	body: PropTypes.string,
	cancelLabel: PropTypes.string,
	confirmationLabel: PropTypes.string,
	confirmationType: PropTypes.oneOf(['danger', 'primary', 'success', 'warning']),
	onCancel: PropTypes.func,
	onConfirmation: PropTypes.func,
};
ConfirmationDialog.defaultProps = {
	cancelLabel: 'Cancel',
	confirmationLabel: 'Okay',
	isOpen: false,
};

export default ConfirmationDialog;
