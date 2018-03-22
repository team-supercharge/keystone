var async = require('async');
var assign = require('object-assign');
var listToArray = require('list-to-array');

const { mapValues, merge } = require('lodash');

module.exports = function (req, res) {
	var where = {};
	var fields = req.query.fields;
	var includeCount = req.query.count !== 'false';
	var includeResults = req.query.results !== 'false';
	const includeDefaults = req.query.defaults !== 'false';

	if (includeResults && fields) {
		if (fields === 'false') {
			fields = false;
		}
		if (typeof fields === 'string') {
			fields = listToArray(fields);
		}
		if (fields && !Array.isArray(fields)) {
			return res.status(401).json({ error: 'fields must be undefined, a string, or an array' });
		}
	}
	var filters = req.query.filters;
	if (filters && typeof filters === 'string') {
		try { filters = JSON.parse(req.query.filters); }
		catch (e) { } // eslint-disable-line no-empty
	}
	if (typeof filters === 'object') {
		assign(where, req.list.addFiltersToQuery(filters));
	}
	if (req.query.search) {
		assign(where, req.list.addSearchToQuery(req.query.search));
	}
	var query = req.list.model.find(where);
	if (req.query.populate) {
		query.populate(req.query.populate);
	}
	if (req.query.expandRelationshipFields && req.query.expandRelationshipFields !== 'false') {
		req.list.relationshipFields.forEach(function (i) {
			query.populate(i.path);
		});
	}
	var sort = req.list.expandSort(req.query.sort);
	async.waterfall([
		function (next) {
			if (!includeCount) {
				return next(null, 0);
			}
			query.count(next);
		},
		function (count, next) {
			if (!includeResults) {
				return next(null, count, []);
			}
			query.find();
			query.limit(Number(req.query.limit) || 100);
			query.skip(Number(req.query.skip) || 0);
			if (sort.string) {
				query.sort(sort.string);
			}
			query.exec(function (err, items) {
				next(err, count, items);
			});
		},
	], function (err, count, items) {
		if (err) {
			res.logError('admin/server/api/list/get', 'database error finding items', err);
			return res.apiError('database error', err);
		}

		const defaults = mapValues(req.list.fields, ({ _nativeType }) =>
			typeof _nativeType === 'function' && _nativeType());

		// ================================
		// PLEASE NOTE: Due to the expected behaviour that only the true revisions should be shown on the listing page
		// a special conditional must have been applied.
		// Since the createdAt timestamp is not saved on the document, the objectid must be checked
		// I assume that the user is not able to create and modify the log within 1 second.
		// ================================
		if (req.list.key === 'LogRevision') {
			const trueRevisions = items.filter(item => {
				let createdAt = item._id.getTimestamp();
				return Math.abs(item.timeLogged - createdAt) > 1000;
			});

			return res.json({
				results: includeResults
					? trueRevisions.map(function (item) {
						const result = req.list.getData(item, fields, req.query.expandRelationshipFields);

						if (includeDefaults) {
							result.fields = merge({}, defaults, result.fields);
						}

						return result;
					})
					: undefined,
				count: includeCount
					? trueRevisions.length
					: undefined,
			});
		}

		return res.json({
			results: includeResults
				? items.map(function (item) {
					const result = req.list.getData(item, fields, req.query.expandRelationshipFields);

					if (includeDefaults) {
						result.fields = merge({}, defaults, result.fields);
					}

					return result;
				})
				: undefined,
			count: includeCount
				? count
				: undefined,
		});
	});
};
