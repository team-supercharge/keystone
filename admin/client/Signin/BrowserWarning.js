import React from 'react';

let logo = { src: `${Keystone.adminPath}/images/lmc_logo_large.png`, width: 200 };

const BrowserWarning = () => (
	<div style={styles.container}>
		<div style={styles.text}>
			<div style={styles.logo}>
				<img
					src={logo.src}
					width={logo.width ? logo.width : null}
					alt={'Log my Care'}
				/>
			</div>
			<br />
			Looks like you're an outdated browser that will prevent you from accessing all the features of Log my Care.
			<br />
			<br />
			Please use Google Chrome instead.
		</div>
	</div>
);

const styles = {
	container: {
		paddingTop: '10vh',
		margin: 30,
	},
	logo: {
		padding: 20,
	},
	text: {
		opacity: 0.8,
		maxWidth: 500,
		fontSize: 18,
		margin: '0 auto',
		textAlign: 'center'
	}
}

module.exports = BrowserWarning;
