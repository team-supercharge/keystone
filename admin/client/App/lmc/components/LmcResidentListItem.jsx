import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const PLACEHOLDER_IMAGE = 'https://s3.eu-west-2.amazonaws.com/lmc-data-production/public/profile_pic_placeholder.png';

class LmcResidentListItem extends Component {
	render () {
		const { data, isActive, compact } = this.props;
		const profile_pic = data.picture || PLACEHOLDER_IMAGE;
		const textStyle = compact ? styles.linkTextCompact : styles.linkText;
		const activeStyle = isActive ? styles.active : null;
		const activeTextStyle = isActive ? styles.activeText : null;
		const activePictureStyle = isActive ? styles.activePicture : null;
		const imgStyle = {
			float: 'left',
			marginLeft: '3px',
			background: `url(${profile_pic})`,
			...activePictureStyle
		};
		return (
			<li className="lmc-resident-list-item lmc-no-underline"
				key={data.id}
				style={{ ...styles.resident, ...activeStyle }}>
				<Link to={this.props.link(data.id)} style={styles.link}>
					<div style={styles.residentName}>
						<span className={compact ? 'lmc-profile-picture__small' : 'lmc-profile-picture'} style={imgStyle} />
						<span style={{...textStyle, ...activeTextStyle}}>
							{ data.subheading
								? <span>
									<span style={styles.subheading}>
										{ data.subheading } <br/>
									</span>
									<span style={styles.mainText}>
										{ data.name }
									</span>
								</span>
								: data.name }
						</span>
					</div>
				</Link>
			</li>
		);
	}
}

LmcResidentListItem.propTypes = {
	data: PropTypes.object.isRequired,
};

const styles = {
	subheading: {
		opacity: 0.7,
		fontSize: 11,
		top: 2,
		position: 'relative',
		fontWeight: 500,
		letterSpacing: 0.4,
	},
	mainText: {
		paddingLeft: 10,
		top: -2,
		position: 'relative',
	},
	link: {
		width: '100%',
	},
	linkText: {
		position: 'relative',
		color: '#222',
		paddingLeft: 10,
	},
	linkTextCompact: {
		top: 8,
		position: 'relative',
		color: '#222',
		paddingLeft: 10,
	},
	resident: {
		display: 'flex',
		padding: '7px 0 7px 7px',
	},
	residentName: {},
	imageContainer: {
		height: '100%',
	},
	active: {
		background: '#f1f1f1',
		fontSize: 14,
		boxSizing: 'border-box',
		borderLeft: '3px solid #e65d78',
	},
	activeText: {
		color: '#e65d78',
	},
	activePicture: {
		marginLeft: 0, 
	}
};

export default LmcResidentListItem;
