var FieldType = require('../Type');
var util = require('util');
var utils = require('keystone-utils');

/**
 * googleChart FieldType Constructor
 * @extends Field
 * @api public
 */
function googleChart (list, path, options) {
	this.options = options;
	this._nativeType = Boolean;
	this._properties = ['dataSource'];
	googleChart.super_.call(this, list, path, options);
}
googleChart.properName = 'GoogleChart';
util.inherits(googleChart, FieldType);

googleChart.prototype.validateInput = function (data, callback) {
	utils.defer(callback, true);
};

googleChart.prototype.validateRequiredInput = function (item, data, callback) {
	utils.defer(callback, true);
};

/**
 * Add filters to a query
 */
googleChart.prototype.addFilterToQuery = function (filter) {
	return {};
};

/* Export Field Type */
module.exports = googleChart;
