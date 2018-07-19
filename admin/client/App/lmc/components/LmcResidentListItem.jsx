import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const PLACEHOLDER_IMAGE = 'https://s3-eu-west-2.amazonaws.com/lmc-marketing-public/wp-content/uploads/2018/04/12092141/profile_pic_placeholder.png';

class LmcResidentListItem extends Component {
	render() {
		const { data, isActive } = this.props;
		const activeStyle = isActive ? styles.active : null;
		const profile_pic = data.picture || PLACEHOLDER_IMAGE;
		return (
			<li className="lmc-resident-list-item"
				key={data.id}
				style={{ ...styles.resident, ...activeStyle }}>
				<Link to={this.props.link(data.id)} style={styles.link}>
					<div style={styles.residentName}>
						<span className="lmc-profile-picture__small" style={{ float: 'left', background: `url(${profile_pic})` }} />
						<span style={styles.linkText}>
							{ data.name }
						</span>
					</div>
				</Link>
			</li>
		)
	}
}

LmcResidentListItem.propTypes = {

};

const styles = {
	link: {
		width: '100%',
	},
	linkText: {
		top: 8,
		position: 'relative',
		color: '#666',
		paddingLeft: 10,
	},
	resident: {
		display: 'flex',
		padding: '3px 0 3px 3px',
	},
	residentName: {
		// margin: 'auto 0 auto 8px',
	},
	residentImg: {
		width: 30,
		borderRadius: 40,
		margin: 4,
	},
	imageContainer: {
		// width: 50,
		height: '100%',
	},
	active: {
		fontWeight: 600,
		background: '#f1f1f1',
		fontSize: 14,
	}
}

export default LmcResidentListItem;