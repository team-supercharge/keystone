import * as types from '../constants.js';
import createReducer from "./createReducer"
import _ from 'lodash';

const initialState = {};

export const data = createReducer(
    initialState,
    {
        [types.SET_LOADED_LISTS](state, { overwrite=true, lists }) {
            const newState = { ...state };
            lists.forEach(list => {
                if (overwrite) {
                    newState[list.listId] = list.result
                } else {
                    newState[list.listId] = _.uniqBy([ ...list.result, ...newState[list.listId] ], 'id');
                }
            })
            return newState;
        },
        [types.SET_LOADED_LIST](state, { overwrite=true, listId, data }) {
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
