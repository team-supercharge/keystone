import * as types from '../constants'
import { getJSON, fetchResidentLogs } from '../common/dataService'
import { setLoadedList } from './Data'
import _ from 'lodash'

export function setSelectedResident(id) {
    return {
        id: id,
        type: types.SET_SELECTED_RESIDENT
    }
}

export function fetchResidents() {
    return (dispatch, getState) => {
        const url = `${Keystone.adminPath}/api/reports/residents`
        return getJSON({ url })
            .then(res => {
                dispatch(setLoadedList('residents', res.result))
                const id = getState().residents.selectedResident
                if (!_.find(res, { id })) {
                    dispatch(setSelectedResident(res[0].id))
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export function loadResidentLogs() {
    return (dispatch, getState) => {
        const { residents } = getState()
        return fetchResidentLogs(residents.selectedResident)
            .then(result => {
                dispatch(setResidentLogs(result.results))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

function setResidentLogs(result) {
    return {
        type: types.SET_RESIDENT_LOGS,
        logs: result
    }
}