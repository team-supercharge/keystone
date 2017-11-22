var FieldType = require('../Type');
var util = require('util');
var utils = require('keystone-utils');

/**
 * Text FieldType Constructor
 * @extends Field
 * @api public
 */
function s3Uploader (list, path, options) {
	this.options = options;
	this._nativeType = Object;
	this._properties = ['accept', 's3Path', 'headers', 'signingUrl'];
	this._underscoreMethods = [];
	s3Uploader.super_.call(this, list, path, options);
}
s3Uploader.properName = 'S3Uploader';

util.inherits(s3Uploader, FieldType);

s3Uploader.prototype.validateInput = function (data, callback) {
	// var value = this.getValueFromData(data);
	// var result = value === undefined || value === null || typeof value === 'string';
	utils.defer(callback, true);
};

s3Uploader.prototype.validateRequiredInput = function (item, data, callback) {
	// var value = this.getValueFromData(data);
	// var result = !!value;
	// if (value === undefined && item.get(this.path)) {
	// 	result = true;
	// }
	utils.defer(callback, true);
};

/**
 * Add filters to a query
 */
s3Uploader.prototype.addFilterToQuery = function (filter) {
	var query = {};
	return query;
};

module.exports = s3Uploader;
