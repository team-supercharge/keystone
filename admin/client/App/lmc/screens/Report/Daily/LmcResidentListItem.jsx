import React, { Component } from 'react';
import PropTypes from 'prop-types';


class LmcResidentListItem extends Component {
	render() {
		const { data, onSelect, isActive } = this.props;
		const ref = `${Keystone.adminPath}/reports/residents/${data.id}`;
		const activeStyle = isActive ? styles.active : null;
		const profile_pic = data.picture || 'https://s3.eu-west-2.amazonaws.com/lmc-marketing-public/resident_placeholder.png';

		return (
			<li className="lmc-resident-list-item"
				key={ data.id }
				style={{ ...styles.resident, ...activeStyle }}
				onClick={ () => onSelect(data) } >
				<img style={ styles.residentImg } src={ profile_pic }/>
				{ data.name }
			</li>
		)
	}
}

LmcResidentListItem.propTypes = {

};

const styles = {
	resident: {},
	residentImg: {
		width: 42,
		margin: 7
	},
	active: {
		fontWeight: 600,
		background: '#f1f1f1',
		fontSize: 15,
	}
}

export default LmcResidentListItem;