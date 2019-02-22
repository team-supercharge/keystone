jest.mock('../../../../shared/CreateForm')

import React from 'react'
import { shallow } from 'enzyme'
import { LmcShiftPasswordsScreen } from '../components/LmcShiftPasswordsScreen.jsx'

describe('LmcShiftPasswordsScreen', () => {
    let wrapper
    let shifts
    const fetchShiftsMock = jest.fn()
    const deleteShiftMock = jest.fn()

    beforeEach(() => {
        shifts = [
            { id: 'testId1', title: 'testShift1', password: 'testPassword1' },
            { id: 'testId2', title: 'testShift2', password: 'testPassword2' }
        ]

        wrapper = shallow(
            <LmcShiftPasswordsScreen 
                shifts={shifts}
                fetchShifts={fetchShiftsMock}
                deleteShift={deleteShiftMock}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('renders an LmcShiftPasswordsList', () => {
        expect(wrapper.find('LmcShiftPasswordsList').length).toEqual(1)
    })

    it('renders an LmcCreateButton', () => {
        const button = wrapper.find('LmcCreateButton')
        const { buttonText, listId, title, onCreate } = button.props()

        expect(buttonText).toEqual('Shift')
        expect(listId).toEqual('Shift')
        expect(title).toEqual('Add a Shift')
        expect(onCreate).toEqual(fetchShiftsMock)
    })

    it('renders an LmcSpinner when there is no data', () => {
        const emptyWrapper = shallow(
            <LmcShiftPasswordsScreen
                shifts={null}
                fetchShifts={fetchShiftsMock}
                deleteShift={deleteShiftMock}
            />
        )

        expect(wrapper.find('LmcSpinner').length).toEqual(0)
        expect(emptyWrapper.find('LmcShiftPasswordsTable').length).toEqual(0)
        expect(emptyWrapper.find('LmcSpinner').length).toEqual(1)
    })
})