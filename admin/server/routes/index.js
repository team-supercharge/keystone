var _ = require('lodash');
var ejs = require('ejs');
var path = require('path');
var pkg = require('../../../package.json');
var templatePath = path.resolve(__dirname, '../templates/index.html');

module.exports = async function IndexRoute (req, res) {
	var keystone = req.keystone;
	var lists = {};
	_.forEach(keystone.lists, function (list, key) {
		lists[key] = list.getOptions();
	});

	var UserList = keystone.list(keystone.get('user model'));

	const Home = await keystone.list('Home').model.findOne({ _id: req.user.home });

	var orphanedLists = keystone.getOrphanedLists().map(function (list) {
		return _.pick(list, ['key', 'label', 'path']);
	});

	var backUrl = keystone.get('back url');
	if (backUrl === undefined) {
		// backUrl can be falsy, to disable the link altogether
		// but if it's undefined, default it to "/"
		backUrl = '/';
	}

	var keystoneData = {
		adminPath: '/' + keystone.get('admin path'),
		appversion: keystone.get('appversion'),
		backUrl: backUrl,
		brand: keystone.get('brand'),
		csrf: { header: {} },
		devMode: !!process.env.KEYSTONE_DEV,
		production: (process.env.NODE_ENV === 'production'),
		lists: lists,
		nav: keystone.nav,
		orphanedLists: orphanedLists,
		signoutUrl: keystone.get('signout url'),
		user: {
			id: req.user.id,
			name: UserList.getDocumentName(req.user) || '(no name)',
			role: req.user.role,
			firstLogin: req.user.firstLogin,
			home: req.user.home,
			homeName: Home ? Home.name : null,
			features: Home ? {
				homeDocuments: Home.homeDocuments,
				handovers: Home.handovers,
				offlineMode: Home.offlineMode,
				notifications: Home.notifications,
				pro: Home.pro || Home.offlineMode // legacy for app v2.1.0
			} : null,
		},
		ga: {
			property: keystone.get('ga property'),
			domain: keystone.get('ga domain'),
		},
		userList: UserList.key,
		version: keystone.version,
		wysiwyg: { options: {
			enableImages: keystone.get('wysiwyg images') ? true : false,
			enableCloudinaryUploads: keystone.get('wysiwyg cloudinary images') ? true : false,
			enableS3Uploads: keystone.get('wysiwyg s3 images') ? true : false,
			additionalButtons: keystone.get('wysiwyg additional buttons') || '',
			additionalPlugins: keystone.get('wysiwyg additional plugins') || '',
			additionalOptions: keystone.get('wysiwyg additional options') || {},
			overrideToolbar: keystone.get('wysiwyg override toolbar'),
			skin: keystone.get('wysiwyg skin') || 'keystone',
			menubar: keystone.get('wysiwyg menubar'),
			importcss: keystone.get('wysiwyg importcss') || '',
		} },
	};
	keystoneData.csrf.header[keystone.security.csrf.CSRF_HEADER_KEY] = keystone.security.csrf.getToken(req, res);

	var codemirrorPath = keystone.get('codemirror url path')
		? '/' + keystone.get('codemirror url path')
		: '/' + keystone.get('admin path') + '/js/lib/codemirror';

	var locals = {
		adminPath: keystoneData.adminPath,
		cloudinaryScript: false,
		codemirrorPath: codemirrorPath,
		env: keystone.get('env'),
		fieldTypes: keystone.fieldTypes,
		// ga: {
		// 	property: keystone.get('ga property'),
		// 	domain: keystone.get('ga domain'),
		// },
		keystone: keystoneData,
		version: pkg.version,
		title: keystone.get('name') || 'Keystone',
	};

	var cloudinaryConfig = keystone.get('cloudinary config');
	if (cloudinaryConfig) {
		var cloudinary = require('cloudinary');
		var cloudinaryUpload = cloudinary.uploader.direct_upload();
		keystoneData.cloudinary = {
			cloud_name: keystone.get('cloudinary config').cloud_name,
			api_key: keystone.get('cloudinary config').api_key,
			timestamp: cloudinaryUpload.hidden_fields.timestamp,
			signature: cloudinaryUpload.hidden_fields.signature,
		};
		locals.cloudinaryScript = cloudinary.cloudinary_js_config();
	};

	ejs.renderFile(templatePath, locals, {}, function (err, str) {
		if (err) {
			console.error('Could not render Admin UI Index Template:', err);
			return res.status(500).send(keystone.wrapHTMLError('Error Rendering Admin UI', err.message));
		}
		res.send(str);
	});
};
