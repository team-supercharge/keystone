import {
	SUBMIT_FORM,
	SET_FORM_FIELD,
	CLEAR_FORM_FIELD,
	CLEAR_ALL_FORM_FIELDS,
} from './constants';

export function submitForm () {
	return { type: SUBMIT_FORM }; // sent POST to backend!
};

export function setFormField ({ key, value }) {
	return {
		type: SET_FORM_FIELD,
		key,
		value,
	};
};

export function clearFormData ({ key, value }) {
	return {
		type: CLEAR_ALL_FORM_FIELDS,
		key,
	};
};

export function clearAllFormFields () {
	return {
		type: CLEAR_ALL_FORM_FIELDS
	};
};

