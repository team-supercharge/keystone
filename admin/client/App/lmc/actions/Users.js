import * as types from '../constants'

export function setSelectedUser(id) {
    return {
        id: id,
        type: types.SET_SELECTED_USER
    }
}