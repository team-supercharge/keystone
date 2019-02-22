import React from 'react'
import { shallow } from 'enzyme'
import LmcShiftPasswordItem from '../components/LmcShiftPasswordItem.jsx'

describe('LmcShiftPasswordItem', () => {
    let wrapper
    let shift
    let savedKeystone
    const onDeleteMock = jest.fn()

    beforeAll(() => {
        savedKeystone = global.Keystone
        global.Keystone = { adminPath: '/admin' }
    })

    beforeEach(() => {
        shift = {
            id: 'testId',
            title: 'testShift',
            password: 'testPassword',
            startTime: '08:00',
            endTime: '18:00',
            accessTime: '4'
        }
        wrapper = shallow(
            <LmcShiftPasswordItem
                shift={shift}
                onDelete={onDeleteMock}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('renders a list item', () => {
        expect(wrapper.find('li').length).toEqual(1)
    })

    it('renders a confirmation dialog to trigger its onDelete prop', () => {
        const dialog = wrapper.find('ConfirmationDialog')
        dialog.props().onConfirmation()
        expect(onDeleteMock).toHaveBeenCalledTimes(1)
        expect(onDeleteMock).toHaveBeenCalledWith(shift.id)
    })

    it('renders a button to edit the shift', () => {
        const button = wrapper.find('GlyphButton')
        expect(button.props().to).toEqual(`${Keystone.adminPath}/shifts/${shift.id}`)
    })

    afterEach(() => {
        onDeleteMock.mockClear()
    })

    afterAll(() => {
        global.Keystone = savedKeystone
    })
})