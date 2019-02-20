import { data } from '../Data'
import * as types from '../../constants'

describe('Data reducer', () => {
    let initialState

    beforeAll(() => {
        initialState = Object.freeze({})
    })
    
    it('should return the initial state', () => {
        expect(data(undefined, {})).toEqual(initialState)
    })

    it('should handle SET_LOADED_LISTS with overwrite', () => {
        const action = {
            lists: [
                { 
                    result: [{ id: 'User1' }, { id: 'User2' }],
                    listId: 'users'
                },
                {
                    result: [{ id: 'Log1' }, { id: 'Log2' }],
                    listId: 'logs'
                },
            ],
            overwrite: true,
            type: types.SET_LOADED_LISTS,
        }
        expect(data(initialState, action)).toEqual({
            users: action.lists[0].result,
            logs: action.lists[1].result,
        })
    })

    it('should handle SET_LOADED_LISTS without overwrite and group by ID', () => {
        const state = Object.freeze({
            users: [
                { id: 'User1' }, 
                { id: 'User2', deleteMe: true }
            ],
            logs: [
                { id: 'Log1' }, 
                { id: 'Log2', deleteMe: true }
            ],
        })
        const action = {
            lists: [
                {
                    result: [{ id: 'User2' }],
                    listId: 'users',
                },
                {
                    result: [{ id: 'Log2' }],
                    listId: 'logs'
                },
            ],
            overwrite: false,
            type: types.SET_LOADED_LISTS,
        }
        expect(data(state, action)).toEqual({
            users: [
                { id: 'User2' },
                { id: 'User1' }
            ],
            logs: [
                { id: 'Log2' },
                { id: 'Log1' },
            ],
        })
    })

    it('should handle SET_LOADED_LIST with overwrite', () => {
        const action = {
            data: [{ id: 'User1' }],
            listId: 'users',
            overwrite: true,
            type: types.SET_LOADED_LIST
        }
        expect(data(initialState, action)).toEqual({
            users: action.data
        })
    })

    it('should handle SET_LOADED_LIST without overwrite and group by ID', () => {
        const state = Object.freeze({ users: [
            { id: 'User1' },
            { id: 'User2', deleteMe: true }
        ]})
        const action = {
            data: [
                { id: 'User2' },
            ],
            listId: 'users',
            overwrite: false,
            type: types.SET_LOADED_LIST
        }

        expect(data(state, action)).toEqual({
            users: [{ id: 'User2' }, { id: 'User1' }]
        })
    })

    it('should handle CLEAR_LISTS', () => {
        const state = {
            users: [{ id: 'User1' }],
            logs: [{ id: 'Log1' }],
        }
        const action = {
            type: types.CLEAR_LISTS
        }
        expect(data(state, action)).toEqual(initialState)
    })
})