import { residents } from '../Residents'
import * as types from '../../constants'

describe('Residents reducer', () => {
    let initialState

    beforeAll(() => {
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
})