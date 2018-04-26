import React, { Component } from 'react';
import PropTypes from 'prop-types';
const PLACEHOLDER_IMAGE = 'https://s3-eu-west-2.amazonaws.com/lmc-marketing-public/wp-content/uploads/2018/04/12092141/profile_pic_placeholder.png';

class LmcResidentListItem extends Component {
	render() {
		const { data, onSelect, isActive } = this.props;
		const ref = `${Keystone.adminPath}/reports/residents/${data.id}`;
		const activeStyle = isActive ? styles.active : null;
		const profile_pic = data.picture || PLACEHOLDER_IMAGE;

		return (
			<li className="lmc-resident-list-item"
				key={ data.id }
				style={{ ...styles.resident, ...activeStyle }}
				onClick={ () => onSelect(data) } >
				<span style={styles.imageContainer}>
					<div className="lmc-profile-picture" style={{ background: `url(${profile_pic})` }}></div>
				</span>
				<span style={styles.residentName}>
					{ data.name }
				</span>
			</li>
		)
	}
}

LmcResidentListItem.propTypes = {

};

const styles = {
	resident: {
		display: 'flex',
		padding: '3px 0 3px 3px',
	},
	residentName: {
		margin: 'auto 0 auto 8px',
	},
	residentImg: {
		width: 42,
		borderRadius: 40,
		margin: 7,
	},
	imageContainer: {
		height: '100%',
	},
	active: {
		fontWeight: 600,
		background: '#f1f1f1',
		fontSize: 14,
	}
}

export default LmcResidentListItem;