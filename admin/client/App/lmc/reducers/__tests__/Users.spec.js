import { users } from '../Users'
import * as types from '../../constants'

describe('Users reducer', () => {
    let initialState

    beforeEach(() => {
        initialState = Object.freeze({})
    })

    it('should handle SET_SELECTED_USER', () => {
        const action = {
            id: 'TestId',
            type: types.SET_SELECTED_USER
        }
        expect(users(initialState, action)).toEqual({
            selectedUser: action.id
        })
    })
})