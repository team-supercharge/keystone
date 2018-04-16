import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LmcResidentListItem from './LmcResidentListItem.jsx';
import _ from 'lodash';


class LmcResidentList extends PureComponent {

	constructor(props) {
        super(props);
        this.state = {
            filterValue: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.renderResidents = this.renderResidents.bind(this);
		this.renderFilterInput = this.renderFilterInput.bind(this);
	}

	handleChange(event) {
        this.setState({ filterValue: event.target.value })
	}

    renderResidents() {
		const { filterValue } = this.state;
		const { onSelect, current } = this.props;
		const pattern = new RegExp(filterValue, 'i');
		let { data } = this.props;


		if (filterValue.length) {
			data = data.filter(res => res.name.match(pattern));
		};

		data = _.sortBy(data, 'name');
        return data.length ? 
			<ul style={styles.list}>
				{ data.map(row => <LmcResidentListItem data={row} 
					isActive={ current && current.id && (row.id === current.id) }
					onSelect={ () => onSelect(row) } />	)
				}
			</ul> :
            <p style={styles.noMatch}>
				No matches
			</p>
	}
	
	renderFilterInput() {
		return (
			<input placeholder="Filter..." 
				type="text"
				autoComplete="off"
				value={this.state.value} 
				onChange={this.handleChange}
				className="LmcFormInput"
				name="lmcResidentName" />
		)
	}

	render() {
		return (
			<div className="">
				<div style={styles.container}>
					<h2>
						Residents
					</h2>
					{ this.renderFilterInput() }
					{ this.renderResidents() }
				</div>
			</div>
		);
	}
}

LmcResidentList.propTypes = {

};


const styles = {
    container: {
		margin: '27px 20px 0 25px',
	},
	list: {
		listStyle: 'none',
		paddingLeft: 0,
		cursor: 'pointer',
	},
    resident: {
        margin: 10,
        fontSize: 20
    },
    residentImg: {
        width: 60,
        height: 60
    },
    noMatch: {
        margin: 10,
        fontSize: 16,
        color: 'rgba(0,0,0,0.6)'
    }
}


export default LmcResidentList;