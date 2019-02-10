import * as residentActions from '../residents'

describe('Resident actions: ', () => {
    let action

    describe('Set selected resident', () => {
        let userId

        beforeAll(() => {
            userId = 'testId'
            action = residentActions.setSelectedResident(userId)
        })

        it('has the correct type', () => {
            expect(action.type).toEqual('RESIDENTS/SET_SELECTED_RESIDENT')
        })

        it('has the correct user ID', () => {
            expect(action.id).toEqual(userId)
        })
    })
})