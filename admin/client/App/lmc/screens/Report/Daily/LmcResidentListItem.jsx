import React, { Component } from 'react';
import PropTypes from 'prop-types';


class LmcResidentListItem extends Component {
	render() {
		const { data, onSelect, isActive } = this.props;
		const ref = `${Keystone.adminPath}/reports/residents/${data.id}`;
		const activeStyle = isActive ? styles.active : null;
		return (
			<li className="lmc-resident-list-item"
				style={{ ...styles.resident, ...activeStyle }}
				onClick={ () => onSelect(data) } >
				<img style={styles.residentImg} src="https://raw.githubusercontent.com/Infernus101/ProfileUI/0690f5e61a9f7af02c30342d4d6414a630de47fc/icon.png"/>
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
		width: 30,
		margin: 10
	},
	active: {
		fontWeight: 600,
		background: '#f1f1f1',
		fontSize: 15,
	}
}

export default LmcResidentListItem;