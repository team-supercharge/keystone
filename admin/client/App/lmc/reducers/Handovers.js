import * as types from '../constants.js';
import createReducer from "./createReducer"
import _ from 'lodash';

const initialState = {};

export const handovers = createReducer(
    initialState,
    {
        [types.SET_CURRENT_HANDOVER_LOGS](state, { logs }) {
            const newState = { ...state }
            newState.currentLogs = logs
            return newState
        },
        [types.SET_CURRENT_HANDOVER_NOTES](state, { notes }) {
            const newState = { ...state }
            newState.currentNotes = notes
            return newState
        }
    }
);