import assign from 'object-assign';
import {
    SUBMIT_FORM,
	SET_FORM_FIELD,
	CLEAR_FORM_FIELD,
    CLEAR_ALL_FORM_FIELDS,
} from './constants';

const initialState = {
    currentStep: 2,
    formData: {},
};

export default function lmcModalReducer (state = initialState, action) {
    switch (action.type) {
        case CLEAR_ALL_FORM_FIELDS:
            return assign({}, initialState);

        case SET_FORM_FIELD:
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