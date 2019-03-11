import { handovers } from '../Handovers'
import * as types from '../../constants'

describe('Residents reducer', () => {
    let initialState

    beforeEach(() => {
        initialState = Object.freeze({
            current: null
        })
    })

    it('should handle SET_CURRENT_HANDOVER', () => {
        const action = {
            data: { 
                logs: [{ id: 'TestId', createdBy: 'TestCarer', description: 'This is a log' }],
                notes: [{ id: 'TestId', createdBy: 'TestCarer', description: 'This is a note' }],
            },
            type: types.SET_CURRENT_HANDOVER,
        }
        expect(handovers(initialState, action)).toEqual({ 
            current: action.data
        })
    })
})