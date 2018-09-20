import assign from 'object-assign';
import moment from 'moment';
import {
    SUBMIT_FORM,
	SET_FORM_FIELD,
	CLEAR_FORM_FIELD,
    CLEAR_ALL_FORM_FIELDS,
    SET_RECURRENCE_TYPE,
	TOGGLE_RECURRENCE,
    TOGGLE_RECURRENCE_OPTION,
    TOGGLE_CREATE_TODO_MODAL,
} from './constants';
import _ from 'lodash';

const initialState = {
    showCreateTodoModal: false,
    formData: {},
};

function getRecurrenceOptions(type) {
    if (type === 'every_15') {
        let i = 24 * 4;
        return _.range(24 * 4)
            .map(i => ({
                key: moment().startOf('d').add(i * 15, 'm').format('HH:mm'),
                active: true,
            }));
    } else if (type === 'hourly') {
        return _.range(24)
            .map(i => ({
                key: moment().startOf('d').add(i, 'h').format('HH:mm'),
                active: true,
            }));
    } else if (type === 'daily') {
        return [
            { key: 'MO', active: true },
            { key: 'TU', active: true },
            { key: 'WE', active: true },
            { key: 'TH', active: true },
            { key: 'FR', active: true },
            { key: 'SA', active: true },
            { key: 'SU', active: true },
        ];
    } else {
        return [];
    };
}

export default function lmcModalReducer (state = initialState, action) {
    console.log(state, action);
    switch (action.type) {
        case CLEAR_ALL_FORM_FIELDS:
            return assign({}, initialState);

        case SET_RECURRENCE_TYPE:
            return assign({}, state, {
                formData: {
                    ...state.formData,
                    recurrence: action.value,
                    recurrenceOptions: getRecurrenceOptions(action.value)
                }
            });

        case TOGGLE_CREATE_TODO_MODAL:
            return assign({}, state, {
                showCreateTodoModal: !state.showCreateTodoModal
            });

        case TOGGLE_RECURRENCE_OPTION:
            const recurrenceOptions = _.cloneDeep(state.formData.recurrenceOptions);
            recurrenceOptions[action.value].active = !recurrenceOptions[action.value].active;
            return assign({}, state, {
                formData: {
                    ...state.formData,
                    recurrenceOptions,
                }
            });

        case SET_FORM_FIELD:
            return assign({}, state, {
                formData: {
                    ...state.formData,
                    [action.key]: action.value,
                }
            });

        case SUBMIT_FORM:
            return assign({}, state, {
                formData: {
                    ...state.formData,
                    [action.key]: action.value,
                }
            });

        default:
			return state;
    }
};