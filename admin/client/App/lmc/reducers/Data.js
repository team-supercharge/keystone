import * as types from '../constants.js';
import createReducer from "./createReducer"
import _ from 'lodash';

const initialState = {
    // users: [],
    // residents: [],
    // documents: [],
    // logs: [],
    // tasks: [],
    // logCategories: [],
    // logCategoryItems: [],
};

export const data = createReducer(
    initialState,
    {
        [types.SET_LOADED_LISTS](state, { lists, overwrite=true }) {
            const newState = { ...state };
            lists.forEach(list => {
                if (overwrite) {
                    newState[list.listId] = list.data
                } else {
                    newState[list.listId] = _.uniqBy([ ...list.data, ...newState[list.listId] ], 'id');
                }
            })
            return newState;
        },
        [types.SET_LOADED_LIST](state, { data, listId, overwrite=true, }) {
            const newState = { ...state };
            if (overwrite) {
                newState[listId] = data;
            } else {
                newState[listId] = _.uniqBy([ ...data, ...newState[listId] ], 'id');
            }
            return newState;
        },
        [types.CLEAR_LISTS](state, action) {
            return initialState;
        }
    }
);
