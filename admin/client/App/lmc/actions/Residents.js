import * as types from '../constants'
import { fetchResidentLogs } from '../common/dataService'

export function setSelectedResident(id) {
    return {
        id: id,
        type: types.SET_SELECTED_RESIDENT
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