import * as types from '../constants'
import { getJSON } from '../common/dataService'

export function fetchCurrentHandoverLogs() {
    return (dispatch) => {
        const url = `${Keystone.adminPath}/api/reports/handovers/current/logs`
        return getJSON({ url })
            .then(res => {
                dispatch(setCurrentHandoverLogs(res.result))
            })
            .catch(e => {
                console.log(e)
            })
    }
}

export function fetchCurrentHandoverNotes() {
    return (dispatch) => {
        const url = `${Keystone.adminPath}/api/reports/handovers/current/notes`
        return getJSON({ url })
            .then(res => {
                dispatch(setCurrentHandoverNotes(res.result))
            })
            .catch(e => {
                console.log(e)
            })
    }
}

function setCurrentHandoverLogs(logs) {
    return {
        logs,
        type: types.SET_CURRENT_HANDOVER_LOGS
    }
}

function setCurrentHandoverNotes(notes) {
    return {
        notes,
        type: types.SET_CURRENT_HANDOVER_NOTES
    }
}