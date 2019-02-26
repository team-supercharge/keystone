import * as types from '../constants.js';
import createReducer from "./createReducer"
import _ from 'lodash';

const initialState = {};

export const users = createReducer(
    initialState,
    {
        [types.SET_SELECTED_USER](state, { id }) {
            let newState = { ...state };
            newState.selectedUser = id;
            return newState;
        }
    }
);