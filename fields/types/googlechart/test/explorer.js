module.exports = {
	Field: require('../GoogleChartField'),
	Filter: require('../GoogleChartFilter'),
	readme: require('fs').readFileSync('./fields/types/googlechart/Readme.md', 'utf8'),
	section: 'Google Chart',
	spec: {
		label: 'Google Chart',
		path: 'googlechart',
		value: true,
	},
};
