import * as types from "../constants";
import * as GlobalActions from "../Global";
import {
    fetchTasks,
} from '../common/dataService';

// api/reports/tasks
export function loadTasks() {
    return (dispatch, getState) => {
        const currentDate = getState().Todos.currentDate;
        dispatch(GlobalActions.showLoading(true));
        return fetchTasks(currentDate)
            .then(resp => {
                dispatch(setLoadedTasks(resp));
                dispatch(GlobalActions.showLoading(false));
            })
            .catch(ex => {
                dispatch(GlobalActions.showLoading(false));
                dispatch(GlobalActions.showLoading(false));
            });
    };
}

function setLoadedTasks({ result }) {
    return {
        type: types.TASKS_LOADED,
        result
    };
}

function setTasksError({ error }) {
    return {
        type: types.TASKS_ERROR,
        error
    };
}