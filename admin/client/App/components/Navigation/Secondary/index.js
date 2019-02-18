/**
 * The secondary navigation links to inidvidual lists of a section
 */

import React from 'react';
import { connect } from 'react-redux';
import { Container } from '../../../elemental';

import {
	setActiveList,
} from '../../../screens/List/actions/active';
import SecondaryNavItem from './NavItem';

var SecondaryNavigation = React.createClass({
	displayName: 'SecondaryNavigation',
	propTypes: {
		currentListKey: React.PropTypes.string,
		lists: React.PropTypes.array.isRequired,
	},
	getInitialState () {
		return {};
	},
	// Handle resizing and hide this nav on mobile (i.e. < 768px) screens
	componentDidMount () {
		this.handleResize();
		window.addEventListener('resize', this.handleResize);
	},
	componentWillUnmount () {
		window.removeEventListener('resize', this.handleResize);
	},

	componentWillUpdate (prevProps) {
		if (this.props !== prevProps) {
			this.handleResize()
		}
	},

	handleResize () {
		const { currentListKey, lists } = this.props
		this.setState({
			navIsVisible: lists && Object.keys(lists).length > 0 && window.innerWidth >= 768,
		});
	},
	// Render the navigation
	renderNavigation (lists) {
		if (!lists || !lists.length) return;
		const navigation = Object.keys(lists).map((key) => {
			const list = lists[key];
			// Get the link and the classname
			const href = list.external ? list.path : `${Keystone.adminPath}/${list.path}`;
			const isActive = this.props.currentListKey && this.props.currentListKey === list.path;
			const className = isActive ? 'active' : null;
			const onClick = (evt) => {
				// If it's the currently active navigation item and we're not on the item view,
				// clear the query params on click
				if (isActive && !this.props.itemId) {
					evt.preventDefault();
					this.props.dispatch(
						setActiveList(this.props.currentList, this.props.currentListKey)
					);
				}
			};

			return (
				<SecondaryNavItem
					key={list.path}
					path={list.path}
					className={className}
					href={href}
					onClick={onClick}
				>
					{list.label}
				</SecondaryNavItem>
			);
		});

		return (
			<ul className="app-nav app-nav--secondary app-nav--left">
				{navigation}
			</ul>
		);
	},
	render () {
		const { currentListKey, lists } = this.props
		if (!this.state.navIsVisible) {
			return null;
		}

		if (currentListKey === 'residents' || 'documents') {
			return null
		}

		return (
			<nav className="secondary-navbar">
				<Container clearFloatingChildren>
					{this.renderNavigation(lists)}
				</Container>
			</nav>
		);
	},
});

module.exports = connect((state) => {
	return {
		currentList: state.lists.currentList,
	};
})(SecondaryNavigation);
