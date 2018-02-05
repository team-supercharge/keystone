import React from 'react';
import Field from '../Field';
import { Chart } from 'react-google-charts';
import xhr from 'xhr';
const axios = require('axios');
const moment = require('moment');
import DateInput from '../../components/DateInput';
import Select from 'react-select';
import {
	InlineGroup as Group,
	InlineGroupSection as Section,
} from '../../../admin/client/App/elemental';

const FORMAT = 'MM/DD/YYYY';

import { StyleSheet, css } from 'aphrodite/no-important';

const classes = StyleSheet.create({
	fullWidth: {
		width: '100%',
	},
	dateField: {
		float: 'left',
		marginRight: 10,
	},
	selectField: {
		float: 'right',
		minWidth: '25%',
		maxWidth: '50%',
	},
});

module.exports = Field.create({
	displayName: 'GoogleChartField',
	statics: {
		type: 'GoogleChart',
	},
	getInitialState: () => ({
		chartProps: false,
		format: FORMAT,
		from: moment().subtract(7, 'days').format(FORMAT),
		to: moment().format(FORMAT),
		selection: null,
	}),
	async componentDidMount () {
		await this.fetchChartList();
		await this.fetchChartData(this.state.selection, this.state.from, this.state.to);
	},
	renderValue () {
		return <div />;
	},
	renderField () {
		return (
			<div>
				<Group className={css(classes.fullWidth)}>
					<Section>
						<DateInput
							className={css(classes.dateField)}
							format={this.state.format}
							onChange={({ value: from }) => {
								this.setState({ from });
								this.fetchChartData(this.state.selection, from, this.state.to);
							}}
							ref="dateInput"
							value={this.state.from}
						/>
						<DateInput
							className={css(classes.dateField)}
							format={this.state.format}
							onChange={({ value: to }) => {
								this.setState({ to });
								this.fetchChartData(this.state.selection, this.state.from, to);
							}}
							ref="dateInput"
							value={this.state.to}
						/>
					</Section>
					{this.props.dataSource.selectEndpoint && <Select
						className={css(classes.selectField)}
						simpleValue
						required
						options={this.state.collections}
						value={this.state.selection}
						onChange={this.selectChart}
					/>}
				</Group>
				{this.state.chartProps && this.state.chartProps.data.length > 1
					? <Chart width={'100%'} height={'400px'} {...this.state.chartProps} />
					: <div style={{ height: '400px' }}>
						No data to visualise.
					</div>
				}

			</div>
		);
	},
	selectChart (selection) {
		this.setState({ selection });
		this.fetchChartData(selection, this.state.from, this.state.to);
	},
	async fetchChartData (selection, from, to) {
		if (!selection) return;
		const id = window.location.pathname.split('/').pop();
		const url = this.props.dataSource.endpoint.replace(/:id/g, id) +
			`?selection=${encodeURIComponent(selection)
			}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;

		try {
			let { data } = await axios.get(url);
			const { chartProps } = data;
			// console.log('CHARTPROPS: ', chartProps);
			this.setState({ chartProps: chartProps });
		} catch (err) {
			console.error(err);
		}
	},
	async fetchChartList () {
		const id = window.location.pathname.split('/').pop();
		const url = this.props.dataSource.selectEndpoint.replace(/:id/g, id);

		try {
			let { data: collections } = await axios.get(url);
			// console.log('COLLECTIONS: ', collections);
			this.setState({ collections, selection: collections[0].value });
			if (collections[0]) this.fetchChartData(collections[0].value, this.state.from, this.state.to);
		} catch (err) {
			console.error(err);
		}
	},
});
