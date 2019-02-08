import * as types from '../constants.js';
import createReducer from "./createReducer"
import _ from 'lodash';
import moment from 'moment';

export const residents = createReducer(
    {},
    {
        // [types.SET_SELECTED_RESIDENT_ID](state, action) {
        //     let newState = {};
        //     newState.loadedMyResidents = _(action.result)
        //         .orderBy(resident => resident.name.first)
        //         .value();
        //         return newState;
        // }
    }
);