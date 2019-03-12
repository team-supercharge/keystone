import * as types from '../constants'
import { getJSON } from '../common/dataService'

export function fetchCurrentHandover() {
    return (dispatch) => {
        const url = `${Keystone.adminPath}/api/reports/handovers/current`
        return getJSON({ url })
            .then(res => {
                dispatch(setCurrentHandover(res.result))
            })
            .catch(e => {
                console.log(e)
            })
    }
}

function setCurrentHandover(data) {
    return {
        data,
        type: types.SET_CURRENT_HANDOVER
    }
}