import { residents } from '../Residents'
import * as types from '../../constants'

describe('Residents reducer', () => {
    let initialState

    beforeEach(() => {
        initialState = Object.freeze({
            selectedResident: 'testId'
        })
    })

    it('should handle SET_SELECTED_RESIDENT', () => {
        const action = {
            id: 'secondId',
            type: types.SET_SELECTED_RESIDENT,
        }
        expect(residents(initialState, action)).toEqual({ 
            selectedResident: 'secondId' 
        })
    })

    it('should handle SET_RESIDENT_LOGS', () => {
        const state = {
            selectedResidentLogs: [{ item: 'Test Type', residentName: 'User', residentId: 'ID' }]
        }
        const action = {
            type: types.SET_RESIDENT_LOGS,
            logs: [{ item: 'Basic group / Fall', residentName: 'testUser', residentId: 'testId' }]
        }
        expect(residents(state, action)).toEqual({
            selectedResidentLogs: [{ item: 'Basic group / Fall', residentName: 'testUser', residentId: 'testId' }]
        })
    })
})