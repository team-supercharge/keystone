import * as types from '../constants';
import createReducer from "./createReducer"
import _ from 'lodash';
import moment from 'moment';

// Ideally:
// build up list of tasks in memory
// normalise
// then extract the relevant subsets (daily)

export const tasks = createReducer(
    {
        currentDate: moment(),
        allTasks: [],
        error: null,
    },
    {
        [types.TASKS_LOADED](state, action) {
            return Object.assign({}, state, {
                allTasks: action.result || state.allTasks,
            });
        },
    },
    {
        [types.TASKS_DATE](state, action) {
            return Object.assign({}, state, {
                currentDate: action.date,
            });
        },
    },
    {
        [types.TASKS_ERROR](state, action) {
            return Object.assign({}, state, {
                error: null
            });
        },
    },
);