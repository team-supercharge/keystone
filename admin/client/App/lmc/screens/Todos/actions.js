import {
	SUBMIT_FORM,
	SUBMIT_ERROR,
	SUBMIT_SUCCESS,
	SET_FORM_FIELD,
	CLEAR_FORM_FIELD,
	CLEAR_ALL_FORM_FIELDS,
	SET_RECURRENCE_TYPE,
	TOGGLE_RECURRENCE_OPTION,
	TOGGLE_CREATE_TODO_MODAL,
} from './constants';
import xhr from 'xhr';


export function submitForm () {
	// sent POST to backend!
	return (dispatch, getState) => {

		// building the formData
		const { formData } = getState().modal;
		const formEncoded = new FormData();
		for (let key in formData) {
			if (key === 'assignee' || key === 'resident') {
				formData[key].split(',').forEach((id) => {
					if (id !== '') formEncoded.append(key, id);
				});
			} else if (key === 'recurrenceOptions') {
				if (formData.recurrenceOptions) {
					formData.recurrenceOptions.forEach(({ key, active }, i) => {
						formEncoded.append(`recurrenceOptions[${i}].key`, key);
						formEncoded.append(`recurrenceOptions[${i}].active`, active);
					});
				}
			} else if (key === 'startDate') {
				formEncoded.append(key, formData[key].toISOString());
			} else {
				formEncoded.append(key, formData[key]);
			}
		}

		xhr({
            url: `${Keystone.adminPath}/api/recurring-tasks/create`,
			method: 'POST',
			responseType: 'json',
			headers: Object.assign({}, Keystone.csrf.header),
			body: formEncoded,
        }, (err, res) => {
            if (err) {
                dispatch({ type: SUBMIT_ERROR });
            } else {
				console.log(res);
                dispatch({ type: SUBMIT_SUCCESS });
            };
        });
	}
};

export function setFormField ({ key, value }) {
	return {
		type: SET_FORM_FIELD,
		key,
		value,
	};
};

export function clearFormData ({ key }) {
	return {
		type: CLEAR_ALL_FORM_FIELDS,
		key,
	};
};

export function toggleCreateTodoModal () {
	return { type: TOGGLE_CREATE_TODO_MODAL };
};

export function setRecurrenceType (value) {
	return {
		type: SET_RECURRENCE_TYPE,
		value,
	}
};

export function toggleRecurrenceOption (value) {
	return {
		type: TOGGLE_RECURRENCE_OPTION,
		value,
	};
};

export function clearAllFormFields () {
	return {
		type: CLEAR_ALL_FORM_FIELDS
	};
};

