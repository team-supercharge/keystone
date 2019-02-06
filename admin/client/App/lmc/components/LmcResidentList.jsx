import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import LmcResidentListItem from './LmcResidentListItem.jsx';
import _ from 'lodash';


class LmcResidentList extends PureComponent {

	constructor (props) {
		super(props);
        this.state = { filterValue: '' };
        this.handleChange = this.handleChange.bind(this);
        this.renderResidents = this.renderResidents.bind(this);
		this.renderFilterInput = this.renderFilterInput.bind(this);
	}

	componentDidMount () {
		const { data, resident_id } = this.props;
        if (!resident_id && data && data.length) {
            let res_id = _.sortBy(data, 'name')[0].id;
            browserHistory.replace(`${Keystone.adminPath}/reports/charts/dashboard/${res_id}`);
        }
	}

	handleChange (event) {
        this.setState({ filterValue: event.target.value });
	}

    renderResidents () {
		const { filterValue } = this.state;
		const { resident_id } = this.props;
		const pattern = new RegExp(filterValue, 'i');
		let { data } = this.props;
		if (filterValue.length) data = data.filter(res => res.name.match(pattern));
		data = _.sortBy(data, 'name');

		return data.length
			? <ul style={styles.list}>
				{ data.map(row => (
					<LmcResidentListItem
						key={row.id}
						compact
						data={row}
						link={this.props.link}
						isActive={resident_id && (row.id === resident_id)} />))
				}
			</ul>
			: <p style={styles.noMatch}>
				No matches
			</p>;
	}

	renderFilterInput () {
		return (
			<div style={styles.filterContainer}>
				<input placeholder="Filter..."
					type="text"
					autoComplete="off"
					value={this.state.value}
					onChange={this.handleChange}
					style={styles.filter}
					className="LmcFormInput"
					name="lmcResidentName" />
			</div>
		)
	}

	render () {
		let { data } = this.props;
		return (
			<div style={styles.container}>
				{ data && data.length > 5 ? this.renderFilterInput() : null }
				{ this.renderResidents() }
			</div>
		);
	}
}

LmcResidentList.propTypes = {

};


const styles = {
	filterContainer: {
		paddingRight: 12,
		paddingLeft: 12,
	},
	filter: {
		height: '3em',
		boxShadow: 'none',
		borderRadius: 0,
		borderColor: '#dadadad9',
		fontWeight: 200,
		fontSize: 18,
	},
    container: {
		width: '100%',
		marginTop: 18,
	},
	list: {
		listStyle: 'none',
		paddingLeft: 0,
		cursor: 'pointer',
	},
    resident: {
        margin: 10,
        fontSize: 20,
    },
    residentImg: {
        width: 60,
        height: 60,
    },
    noMatch: {
        margin: 10,
        fontSize: 16,
        color: 'rgba(0,0,0,0.6)',
    },
}


export default LmcResidentList;
