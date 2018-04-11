/**
 * The global Footer, displays a link to the website and the current Keystone
 * version in use
 */

import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import { Container } from '../../elemental';
import theme from '../../../theme';

var Footer = React.createClass({
	displayName: 'Footer',
	propTypes: {},
	render () {
		return (
			<footer className={css(classes.footer)}>
				<p>
					2018 © LMC Software Ltd.
					All rights reserved.
					Registered address: Health Foundry, 1 Royal Street, London, SE1 7LL
				</p>
				<a className={css(classes.link)} href="/cookie-policy">Cookie Policy</a>|
				<a className={css(classes.link)} href="/data-policy">Data Policy</a>|
				<a className={css(classes.link)} href="/privacy-policy">Privacy Policy</a>|
				<a className={css(classes.link)} href="/gdpr">GDPR</a>
			</footer>
		);
	},
});

/* eslint quote-props: ["error", "as-needed"] */
const linkHoverAndFocus = {
	color: theme.color.gray20,
	outline: 'none',
};

const classes = StyleSheet.create({
	footer: {
		backgroundColor: '#333',
		color: theme.color.gray40,
		fontSize: theme.font.size.small,
		paddingBottom: 25,
		paddingTop: 20,
		textAlign: 'center',
	},
	link: {
		padding: 5,
		color: theme.color.gray40,
		':hover': linkHoverAndFocus,
		':focus': linkHoverAndFocus,
	},
});

module.exports = Footer;
