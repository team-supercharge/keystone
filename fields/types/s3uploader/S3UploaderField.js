import Field from '../Field';
import React from 'react';
import S3Uploader from 'react-s3-uploader';

/**
 * TODO:
 * - Custom path support
 */

module.exports = Field.create({

	displayName: 'SelectField',
	statics: {
		type: 'Select',
	},

	valueChanged (newValue) {
		// TODO: This should be natively handled by the Select component
		if (this.props.numeric && typeof newValue === 'string') {
			newValue = newValue ? Number(newValue) : undefined;
		}
		this.props.onChange({
			path: this.props.path,
			value: newValue,
		});
	},

	renderValue () {
		return (
			<div>
				...S3 upload value
			</div>
		);
	},

	renderField () {
		return (
			<S3Uploader
				signingUrl={this.props.signingUrl || '/s3/sign'}
				signingUrlMethod="GET"
				accept={this.props.accept || 'image/*'}
				s3path={this.props.s3Path || '/uploads'}
				preprocess={(file, done) => {
					console.log('preprocess')
					done(file);
				}}
				onProgress={(...args) => console.log('onProgress', ...args)}
				onError={(...args) => console.log('onError', ...args)}
				onFinish={(...args) => console.log('onFinish', ...args)}
				uploadRequestHeaders={this.props.headers}
				contentDisposition="auto"
				scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/ig, '')}
			/>

		);
	},

});
