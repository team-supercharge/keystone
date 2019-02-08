import * as types from "../constants";

import {
    getJSON,
} from '../common/dataService';

export function initialize() {
    return (dispatch) => {
        const lists = [
            'users',
            'residents',
            'log-categories',
            'log-category-items',
            'residents',
            'documents',
        ];
        dispatch(loadLists(lists));
    }
}

export function loadList(listId) {
    return (dispatch) => {
        return getJSON(listId)
            .then(res => {
                dispatch(setLoadedList(res));
            })
            .catch(err => {
                console.log(err)
            });
    };
}

export function loadLists(lists) {
    return (dispatch) => {
        Promise.all(lists.map(listId => getJSON(listId)))
            .then(results => {
                dispatch(setLoadedLists(results))
            })
            .catch(err => {
                console.log(err)
            });
    };
}

export function clearLists() {
    return (dispatch) => {
        dispatch(clearData())
    }
}

function setLoadedLists({ result }) {
    return {
        type: types.SET_LOADED_LISTS,
        overwrite: true,
        lists: result
    }
}

function setLoadedList({ result }) {
    return {
        type: types.SET_LOADED_LIST,
        overwrite: true,
        result
    };
}

function clearData() {
    return {
        type: types.CLEAR_LISTS,
    }
}
