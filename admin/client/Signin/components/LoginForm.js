/**
 * The login form of the signin screen
 */

import React, { PropTypes } from 'react';
import { Button, Form, FormField, FormInput } from '../../App/elemental';

const LoginForm = ({
	email,
	handleInputChange,
	handleSubmit,
	isAnimating,
	password,
}) => {
	return (
		<div>
			<Form onSubmit={handleSubmit} noValidate>
				<FormField label="Email" htmlFor="email">
					<FormInput
						autoFocus
						type="email"
						name="email"
						onChange={handleInputChange}
						value={email}
					/>
				</FormField>
				<FormField label="Password" htmlFor="password">
					<FormInput
						type="password"
						name="password"
						onChange={handleInputChange}
						value={password}
					/>
				</FormField>
				<Button disabled={isAnimating} color="primary" type="submit" className="lmc-button" style={{ float: 'right', padding: '0 20px', marginTop: 10 }}>
					Sign In
				</Button>
			</Form>
		</div>
	);
};

LoginForm.propTypes = {
	email: PropTypes.string,
	handleInputChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	isAnimating: PropTypes.bool,
	password: PropTypes.string,
};


module.exports = LoginForm;
