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

	LOAD_RESIDENTS,
	LOAD_TASKS,
	TASK_LOADING_SUCCESS,
	RESIDENT_LOADING_SUCCESS,
	DATA_LOADING_ERROR,
} from './constants';
import xhr from 'xhr';
import {
	fetchTasks,
	fetchResidents,
	createTask,
} from '../../common/dataService';


export function loadTasks() {
	return (dispatch) => {
		fetchTasks()
			.then(data => dispatch(tasksLoaded(data)))
			.catch(err => dispatch(loadError(err)));
	}
}

export function loadResidents() {
	return (dispatch) => {
		fetchResidents()
			.then(data => dispatch(residentsLoaded(data)))
			.catch(err => dispatch(loadError(err)));
	}
}

export function residentsLoaded (data) {
	return {
		type: RESIDENT_LOADING_SUCCESS,
		data,
	};
}

export function tasksLoaded (data) {
	return {
		type: TASK_LOADING_SUCCESS,
		data,
	};
}

function showLoading () {
	return { type: SHOW_LOADING };
}
function hideLoading () {
	return { type: HIDE_LOADING };
}

export function loadError (error) {
	return { type: DATA_LOADING_ERROR, error };
}

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
				alert("Opps: " + err.message);
                dispatch({ type: TOGGLE_CREATE_TODO_MODAL });
            } else {
                dispatch({ type: TOGGLE_CREATE_TODO_MODAL });
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

// export function toggleCreateTodoModal () {
// 	return (dispatch, getState) => {
// 		console.log(getState());
// 	}
// };

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

