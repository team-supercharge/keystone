import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router';

/*
const category = this.props.logConfig.find(c => c.id === entity.category);
const item = category.children.find(i => i.id === entity.item);
const categoryIcon = category && category.itemId && Images.images[category.itemId];
const itemIcon = item && item.icon;

*/

class LmcResidentSummary extends React.Component {
	render () {
		const { data } = this.props;

		return (
			<div>
				<h2 style={styles.paddedRight}>
					{ data.name }
					<span style={{ ...styles.subTitle, paddingLeft: 20 }}>
						<span style={styles.subTitlePadding}>
							{ moment(new Date()).diff(moment(data.dateOfBirth), 'years') } years old
						</span>
						{ data.location.building
							? <span style={styles.subTitlePadding}>
								Building { data.location.building }
							</span>
							: null }
						{ data.location.floor
							? <span style={styles.subTitlePadding}>
								Floor { data.location.floor }
							</span>
							: null }
						{ data.location.room
							? <span style={styles.subTitlePadding}>
								Room { data.location.room }
							</span>
							: null }
						<span style={styles.subTitlePadding}>
							<Link to={`${Keystone.adminPath}/residents/${data.id}`}>
								Edit Details
							</Link>
						</span>
					</span>
				</h2>
				{/* <p style={styles.summary}>
					{ data.fields["summary"] }
				</p> */}
			</div>
		)
	}
}

LmcResidentSummary.propTypes = {
    data: PropTypes.object.isRequired,
};

const styles = {
	filterContainer: {
		paddingBottom: 20,
	},
	subTitlePadding: {
		paddingRight: "25px",
	},
	paddedRight: {
		paddingRight: "3px !important",
	},
	subTitle: {
		color: "#848484",
		fontSize: 13,
	},
	summary: {
		color: "#444444",
		paddingBottom: 20,
	},
	logRow: {
		margin: '20px 0',
	},
	category: {
		color: '#7b7b7b',
	},
	logItemImg: {
		width: 40,
		margin: '8px 20px 0 0',
		float: 'left'
	},
	logsList: {
		paddingLeft: 0,
		paddingBottom: 40,
	},
    container: {
        margin: '30px 60px 30px 0'
	},
	smallText: {
		color: '#7b7b7b',
		fontSize: 11,
	},
	titleText: {
		fontWeight: 400,
		fontSize: 20,
		marginBottom: 3,
		lineHeight: '18px',
	},
	descriptionText: {
		fontSize: 12,
		marginLeft: 60,
		color: '#444444',
	},
	divider: {
		height: 2,
		width: '100%',
	}
}

export default LmcResidentSummary;
