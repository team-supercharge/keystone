import React from 'react'
import { shallow } from 'enzyme'
import LmcShiftPasswordItem from '../components/LmcShiftPasswordItem.jsx'

describe('LmcShiftPasswordItem', () => {
    let wrapper
    let shift
    let savedKeystone

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
                onDelete={jest.fn()}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('renders a button to edit the shift', () => {
        const button = wrapper.find('GlyphButton')
        expect(button.props().to).toEqual(`${Keystone.adminPath}/shifts/${shift.id}`)
    })

    afterAll(() => {
        global.Keystone = savedKeystone
    })
})