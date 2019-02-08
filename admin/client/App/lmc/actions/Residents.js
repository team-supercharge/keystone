import * as types from '../constants'

export function setSelectedResident(id) {
    return {
        id: id,
        type: types.SET_SELECTED_RESIDENT
    }
}