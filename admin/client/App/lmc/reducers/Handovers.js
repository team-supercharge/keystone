import * as types from '../constants.js';
import createReducer from "./createReducer"
import _ from 'lodash';

const initialState = {};

export const handovers = createReducer(
    initialState,
    {
        [types.SET_CURRENT_HANDOVER](state, { data }) {
            const newState = { ...state }
            newState.current = data
            return newState
        }
    }
);