import * as types from "../constants";

import {
    getJSON,
} from '../common/dataService';

export function initialize () {
    return (dispatch) => {
        const lists = [
            'carers',
            'residents',
            'log-categories',
            'log-category-items',
            'documents',
            'home-documents'
        ];
        dispatch(loadLists(lists));
    }
}

export function loadList (listId) {
    return (dispatch) => {
        const url = `${Keystone.adminPath}/api/reports/${listId}`
        return getJSON({ url })
            .then(res => {
                dispatch(setLoadedList(listId, res.result));
            })
            .catch(err => {
                console.log(err)
            });
    };
}

export function loadLists (lists) {
    const urls = lists.map(listId => `${Keystone.adminPath}/api/reports/${listId}`)
    return (dispatch) => {
        Promise.all(urls.map(url => getJSON({ url })))
            .then(results => {
                results.forEach((list, index) => { list.listId = lists[index] })
                dispatch(setLoadedLists(results))
            })
            .catch(err => {
                console.log(err)
            });
    };
}

export function clearLists () {
    return (dispatch) => {
        dispatch(clearData())
    }
}

function setLoadedLists (result) {
    return {
        type: types.SET_LOADED_LISTS,
        overwrite: true,
        lists: result
    }
}

function setLoadedList (listId, result) {
    return {
        type: types.SET_LOADED_LIST,
        overwrite: true,
        listId: listId,
        data: result
    };
}

function clearData () {
    return {
        type: types.CLEAR_LISTS,
    }
}
