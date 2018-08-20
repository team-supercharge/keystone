/**
 * The primary (i.e. uppermost) navigation on desktop. Renders all sections and
 * the home-, website- and signout buttons.
 */

import React from 'react';
import { Container } from '../../../elemental';
import PrimaryNavItem from './NavItem';
import _ from 'lodash';
import { fetchCurrentUser } from '../../../lmc/common/dataService';

var PrimaryNavigation = React.createClass({
	displayName: 'PrimaryNavigation',
	propTypes: {
		brand: React.PropTypes.string,
		currentSectionKey: React.PropTypes.string,
		sections: React.PropTypes.array.isRequired,
		signoutUrl: React.PropTypes.string,
	},
	getInitialState () {
		return {};
	},
	// Handle resizing, hide this navigation on mobile (i.e. < 768px) screens
	componentDidMount () {
		this.handleResize();
		window.addEventListener('resize', this.handleResize);
		fetchCurrentUser()
			.then(user => {
				this.setState({
					userRole: _.get(user, 'fields.role'),
				});
			})
			.catch(e => {
				console.log(e);
			});
	},
	componentWillUnmount () {
		window.removeEventListener('resize', this.handleResize);
	},
	handleResize () {
		this.setState({
			navIsVisible: window.innerWidth >= 768,
		});
	},
	// Render the sign out button
	renderSignout () {
		if (!this.props.signoutUrl) return null;

		return (
			<PrimaryNavItem
				label="octicon-sign-out"
				href={this.props.signoutUrl}
				title="Sign Out"
			>
				<span className="octicon octicon-sign-out" />
			</PrimaryNavItem>
		);
	},
	// Render the back button
	renderBackButton () {
		if (!Keystone.backUrl) return null;

		return (
			<PrimaryNavItem
				label="octicon-globe"
				href={Keystone.backUrl}
				title={'Front page - ' + this.props.brand}
			>
				<span className="octicon octicon-globe" />
			</PrimaryNavItem>
		);
	},
	// Render the link to the webpage
	renderFrontLink () {
		return (
			<ul className="app-nav app-nav--primary app-nav--right" id="intro-js-step-navbar">
				<PrimaryNavItem
					href="https://support.logmycare.co.uk/"
					title="Help Centre"
					target="_blank"
				>
					<span>Help Centre</span>
				</PrimaryNavItem>
				{this.renderSignout()}
			</ul>
		);
	},
	renderBrand () {
		// TODO: support navbarLogo from keystone config

		const { brand, currentSectionKey } = this.props;
		const className = currentSectionKey === 'dashboard' ? 'primary-navbar__brand primary-navbar__item--active' : 'primary-navbar__brand';
		const lmc_logo = `${Keystone.adminPath}/images/lmc-logo-white.svg`;

		return (
			<PrimaryNavItem
				className={className}
				label="octicon-home"
				title={'Dashboard - ' + brand}
				to={Keystone.adminPath}
			>
				<img src={lmc_logo} height={30} alt="Log my Care" />
			</PrimaryNavItem>
		);
	},

	renderLMCReports () {

		const section = {
			key: 'lmc-reports',
			label: 'Reports',
		};

		const { currentSectionKey } = this.props;
		const href = `${Keystone.adminPath}/reports/charts`;
		const isActive = currentSectionKey && currentSectionKey === 'reports';
		const className = isActive ? 'primary-navbar__item--active' : null;
		// console.log(href);
		return (
			<PrimaryNavItem
				active={isActive}
				key={section.key}
				label={section.label}
				className={className}
				to={href}
			>
				{ section.label }
			</PrimaryNavItem>
		);
	},

	// Render the navigation
	renderNavigation () {
		if (!this.props.sections || !this.props.sections.length) return null;

		return this.props.sections.map((section) => {
			// Get the link and the class name
			const href = section.lists[0].external ? section.lists[0].path : `${Keystone.adminPath}/${section.lists[0].path}`;
			const isActive = this.props.currentSectionKey && this.props.currentSectionKey === section.key;
			const className = isActive ? 'primary-navbar__item--active' : null;
			// console.log(href);
			return (
				<PrimaryNavItem
					active={isActive}
					key={section.key}
					label={section.label}
					className={className}
					to={href}
				>
					{section.label}
				</PrimaryNavItem>
			);
		});
	},
	render () {
		if (!this.state.navIsVisible) return null;
		const { userRole } = this.state;
		// console.log(this.props.currentSectionKey);
		return (
			<nav className="primary-navbar">
				<Container clearFloatingChildren>
					<ul className="app-nav app-nav--primary app-nav--left">
						{this.renderBrand()}
						{this.renderNavigation()}
						{ userRole !== 'lmc-admin' ? this.renderLMCReports() : null }
					</ul>
					{this.renderFrontLink()}
				</Container>
			</nav>
		);
	},
});

module.exports = PrimaryNavigation;
