import * as types from '../constants.js';
import createReducer from "./createReducer"
import _ from 'lodash';

const initialState = {};

export const residents = createReducer(
    initialState,
    {
        [types.SET_SELECTED_RESIDENT](state, { id }) {
            const newState = { ...state }
            newState.selectedResident = id
            return newState
        }
    }
);