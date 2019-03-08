import { handovers } from '../Handovers'
import * as types from '../../constants'

describe('Residents reducer', () => {
    let initialState

    beforeEach(() => {
        initialState = Object.freeze({
            currentLogs: null,
            currentNotes: null
        })
    })

    it('should handle SET_CURRENT_HANDOVER_LOGS', () => {
        const action = {
            logs: [{ id: 'TestId', createdBy: 'TestCarer', description: 'This is a log' }],
            type: types.SET_CURRENT_HANDOVER_LOGS,
        }
        expect(handovers(initialState, action)).toEqual({ 
            currentLogs: action.logs,
            currentNotes: null
        })
    })

    it('should handle SET_CURRENT_HANDOVER_NOTES', () => {
        const state = {
            currentLogs: null,
            currentNotes: [{ id: 'TestId', createdBy: 'TestCarer', description: 'This is a note' }],
        }
        const action = {
            type: types.SET_CURRENT_HANDOVER_NOTES,
            notes: [{ id: 'TestId2', createdBy: 'TestCarer2', description: 'This is a second note' }],
        }
        expect(handovers(state, action)).toEqual({
            currentLogs: null,
            currentNotes: action.notes,
        })
    })
})