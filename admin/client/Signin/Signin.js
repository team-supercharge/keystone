/**
 * The actual Sign In view, with the login form
 */

import assign from 'object-assign';
import classnames from 'classnames';
import React from 'react';
import xhr from 'xhr';

import Alert from './components/Alert';
import Brand from './components/Brand';
import UserInfo from './components/UserInfo';
import LoginForm from './components/LoginForm';

var SigninView = React.createClass({
	getInitialState () {
		return {
			email: '',
			password: '',
			isAnimating: false,
			isInvalid: false,
			invalidMessage: '',
			signedOut: window.location.search === '?signedout',
		};
	},
	componentDidMount () {
		// Focus the email field when we're mounted
		if (this.refs.email) {
			this.refs.email.select();
		}
	},
	handleInputChange (e) {
		// Set the new state when the input changes
		const newState = {};
		newState[e.target.name] = e.target.value;
		this.setState(newState);
	},
	handleSubmit (e) {
		e.preventDefault();
		// If either password or mail are missing, show an error
		if (!this.state.email || !this.state.password) {
			return this.displayError('Please enter an email address and password to sign in.');
		}

		xhr({
			url: `${Keystone.adminPath}/api/session/signin`,
			method: 'post',
			json: {
				email: this.state.email,
				password: this.state.password,
			},
			headers: assign({}, Keystone.csrf.header),
		}, (err, resp, body) => {
			if (err || body && body.error) {
				let errorText;
				switch (body.error) {
					case 'invalid csrf':
						errorText = 'Something went wrong; please refresh your browser and try again.';
						break;
					case 'not active':
						errorText = 'Carehome admin or carehome is not active';
						break;
					default:
						errorText = 'The email and password you entered are not valid.';
						break;
				}
				return this.displayError(errorText);
			} else if (resp.statusCode === 429) {
				// rate limit exceeded
				return this.displayError("Oh oh, that's too many failed attempts and we've had to freeze your access in case it's someone else trying to get in. Please try again in an hour");
			} else {
				// Redirect to where we came from or to the default admin path
				if (Keystone.redirect) {
					top.location.href = Keystone.redirect;
				} else {
					top.location.href = this.props.from ? this.props.from : Keystone.adminPath;
				}
			}
		});
	},
	/**
	 * Display an error message
	 *
	 * @param  {String} message The message you want to show
	 */
	displayError (message) {
		this.setState({
			isAnimating: true,
			isInvalid: true,
			invalidMessage: message,
		});
		setTimeout(this.finishAnimation, 750);
	},
	// Finish the animation and select the email field
	finishAnimation () {
		// TODO isMounted was deprecated, find out if we need this guard
		if (!this.isMounted()) return;
		if (this.refs.email) {
			this.refs.email.select();
		}
		this.setState({
			isAnimating: false,
		});
	},
	render () {
		const boxClassname = classnames('auth-box', {
			'auth-box--has-errors': this.state.isAnimating,
		});
		return (
			<div className={'lmc-signin-wrapper'}>
				<div style={styles.authWrapper}>
					<div className={boxClassname}>
						<Alert
							isInvalid={this.state.isInvalid}
							signedOut={this.state.signedOut}
							invalidMessage={this.state.invalidMessage}
						/>
						<h1 className="u-hidden-visually">{this.props.brand ? this.props.brand : 'Keystone'} Sign In </h1>
						<div className="auth-box__inner">
							<Brand
								logo={this.props.logo}
								brand={this.props.brand}
							/>
							{this.props.user ? (
								<UserInfo
									adminPath={this.props.from ? this.props.from : Keystone.adminPath}
									signoutPath={`${Keystone.adminPath}/signout`}
									userCanAccessKeystone={this.props.userCanAccessKeystone}
									userName={this.props.user.name}
								/>
							) : (
								<LoginForm
									email={this.state.email}
									handleInputChange={this.handleInputChange}
									handleSubmit={this.handleSubmit}
									isAnimating={this.state.isAnimating}
									password={this.state.password}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	},
});

const styles = {
	authWrapper: {
		width: 350,
		margin: '0 auto',
		paddingTop: 80,
	}
}


module.exports = SigninView;
