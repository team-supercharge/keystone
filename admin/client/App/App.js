/**
 * The App component is the component that is rendered around all views, and
 * contains common things like navigation, footer, etc.
 */
import 'react-dates/initialize';
import React from 'react';
import { Container } from './elemental';
import { Link } from 'react-router';
import { css, StyleSheet } from 'aphrodite/no-important';
import Intercom from 'react-intercom';
import _ from 'lodash';

import MobileNavigation from './components/Navigation/Mobile';
import PrimaryNavigation from './components/Navigation/Primary';
import SecondaryNavigation from './components/Navigation/Secondary';
import Footer from './components/Footer';

const INTERCOM_APP_ID = 'v1fbkzcf';

const classes = StyleSheet.create({
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh',
	},
	body: {
		flexGrow: 1,
		// background: '#fbfbfb',
	},
});

const App = (props) => {
	const listsByPath = require('../utils/lists').listsByPath;
	const intercomUser = {
		user_id: _.get(Keystone, 'user.id'),
		name: _.get(Keystone, 'user.name'),
		company: {
			id: _.get(Keystone, 'user.home'),
			name: _.get(Keystone, 'user.homeName')
		}
	};

	let children = props.children;
	// If we're on either a list or an item view
	let currentList, currentSection;

	if (props.params.listId) {
		currentList = listsByPath[props.params.listId];
		// If we're on a list path that doesn't exist (e.g. /keystone/gibberishasfw34afsd) this will
		// be undefined
		if (!currentList) {
			children = (
				<Container>
					<p>Page not found!</p>
					<Link to={`${Keystone.adminPath}`}>
						Go back home
					</Link>
					{/* <Intercom appID={INTERCOM_APP_ID} { ...intercomUser } /> */}
				</Container>
			);
		} else {
			// Get the current section we're in for the navigation
			currentSection = Keystone.nav.by.list[currentList.key];
		}
	} else if (props.location && props.location.pathname) {
		if (props.location.pathname.match('\/reports')) {
			currentSection = { key: 'reports' };
		} else if (props.location.pathname.match('\/todos')) {
			currentSection = { key: 'todos' };
		} else if (props.location.pathname.match('\/residents')) {
			currentSection = { key: 'residents' };
		} else if (props.location.pathname.match('\/organisation')) {
			currentSection = { key: 'organisation' }
		}
	}
	// Default current section key to dashboard
	const currentSectionKey = (currentSection && currentSection.key) || 'dashboard';

	return (
		<div className={css(classes.wrapper)}>
			<header>
				<MobileNavigation
					brand={Keystone.brand}
					currentListKey={props.params.listId}
					currentSectionKey={currentSectionKey}
					sections={Keystone.nav.sections}
					signoutUrl={Keystone.signoutUrl}
				/>
				<PrimaryNavigation
					currentSectionKey={currentSectionKey}
					brand={Keystone.brand}
					sections={Keystone.nav.sections}
					signoutUrl={Keystone.signoutUrl}
				/>
				{/* If a section is open currently, show the secondary nav */}
				{(currentSection) ? (
					<SecondaryNavigation
						currentListKey={props.params.listId}
						lists={currentSection.lists}
						itemId={props.params.itemId}
					/>
				) : null}
			</header>
			<main className={css(classes.body)}>
				{children}
			</main>
			<Footer />
			<Intercom appID={INTERCOM_APP_ID} {...intercomUser} />
		</div>
	);
};

module.exports = App;
