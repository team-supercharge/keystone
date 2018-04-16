/**
 * Renders a logo, defaulting to the Keystone logo if no brand is specified in
 * the configuration
 */

import React from 'react';

const Brand = function (props) {
	// Default to the KeystoneJS logo
	let logo = { src: `${Keystone.adminPath}/images/lmc_logo_large.png`, width: 200 };
	if (props.logo) {
		// If the logo is set to a string, it's a direct link
		logo = typeof props.logo === 'string' ? { src: props.logo } : props.logo;
		// Optionally one can specify the logo as an array, also stating the
		// wanted width and height of the logo
		// TODO: Deprecate this
		if (Array.isArray(logo)) {
			logo = { src: logo[0], width: logo[1], height: logo[2] };
		}
	}
	return (
		<div>
			<div style={{ minHeight: 145, lineHeight: '115px', margin: '0 auto', textAlign: 'center' }}>
				<img
					src={logo.src}
					width={logo.width ? logo.width : null}
					height={logo.height ? logo.height : null}
					alt={props.brand}
				/>
			</div>
		</div>
	);
};

module.exports = Brand;
