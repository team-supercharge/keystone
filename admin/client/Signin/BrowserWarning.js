import React from 'react';

let logo = { src: 'https://logmycare.co.uk/wp-content/uploads/2018/01/lmc-logo-white.svg', width: 160 };

const BrowserWarning = () => (
	<div className='lmc-browser-warning-wrapper' style={styles.container}>
		<div style={styles.logo}>
			<img
				src={logo.src}
				width={logo.width ? logo.width : null}
				alt={'Log my Care'}
			/>
		</div>
		<div style={styles.textContainer}>
			<span style={styles.bigText}>
				Whoops!
			</span>
			<br />
			Looks like you're using an outdated browser that will prevent you from accessing all the features of Log my Care. Please use Google Chrome instead.
			<br />
			<br />
			<br />
			<a href="https://www.google.com/chrome/" className='lmc-error-button'>
				Get Chrome
			</a>
		</div>
	</div>
);

const styles = {
	bigText: {
		color: 'white',
		fontSize: 50,
		fontWeight: 400,
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
	},
	link: {
		textDecoration: 'underline',
		fontWeight: '600',
		color: 'white',
	},
	logo: {
		padding: 20,
		marginLeft: '10%',
	},
	textContainer: {
		marginTop: '30vh',
		color: 'white',
		opacity: 0.8,
		maxWidth: 500,
		fontSize: 16,
		marginLeft: '11%',
		width: '30vw',
	}
}

module.exports = BrowserWarning;
