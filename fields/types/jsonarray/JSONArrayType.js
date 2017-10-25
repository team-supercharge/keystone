var FieldType = require('../Type');
var util = require('util');
var utils = require('keystone-utils');
var addPresenceToQuery = require('../../utils/addPresenceToQuery');

/**
 * JSONArray FieldType Constructor
 * @extends Field
 * @api public
 */
function jsonarray (list, path, options) {
	this._properties = ['jsonObjectSchema'];
	this.jsonObjectSchema = options.jsonObjectSchema;
	this._nativeType = [];
	this._underscoreMethods = ['format'];
	this.separator = options.separator || ' | ';
	jsonarray.super_.call(this, list, path, options);
}
jsonarray.properName = 'JSONArray';
util.inherits(jsonarray, FieldType);

/**
 * Formats the field value
 */
jsonarray.prototype.format = function (item, separator) {
	return item.get(this.path).join(separator || this.separator);
};

/**
 * Add filters to a query
 *
 * @param {Object} filter 			   		The data from the frontend
 * @param {String} filter.mode  	   		The filter mode, either one of
 *                                     		"beginsWith", "endsWith", "exactly"
 *                                     		or "contains"
 * @param {String} [filter.presence='some'] The presence mode, either on of
 *                                          "none" and "some". Default: 'some'
 * @param {String|Object} filter.value 		The value that is filtered for
 */
jsonarray.prototype.addFilterToQuery = function (filter) {
	const query = {};
	return query;
};

/**
 * Asynchronously confirms that the provided value is valid
 */
jsonarray.prototype.validateInput = function (data, callback) {
	// var value = this.getValueFromData(data);
	utils.defer(callback, true);
};

/**
 * Asynchronously confirms that the a value is present
 */
jsonarray.prototype.validateRequiredInput = function (item, data, callback) {
	utils.defer(callback, true);
};

/**
 * Validates that a value for this field has been provided in a data object
 *
 * Deprecated
 */
jsonarray.prototype.inputIsValid = function (data, required, item) {
	return true;
};

/**
 * Updates the value for this field in the item from a data object.
 * If the data object does not contain the value, then the value is set to empty array.
 */
jsonarray.prototype.updateItem = function (item, data, callback) {
	var value = this.getValueFromData(data);
	if (value === undefined || value === null || value === '') {
		value = [];
	}
	item.set(this.path, value);
	process.nextTick(callback);
};

/* Export Field Type */
module.exports = jsonarray;
