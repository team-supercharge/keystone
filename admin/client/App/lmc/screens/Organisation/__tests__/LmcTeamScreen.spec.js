jest.mock('../../../../shared/CreateForm')

import React from 'react'
import { shallow } from 'enzyme'
import { LmcTeamScreen } from '../components/LmcTeamScreen.jsx'

describe('LmcTeamScreen', () => {
    let wrapper
    let users
    let selectedUser
    const setSelectedUser = jest.fn()

    beforeEach(() => {
        users = [
            { name: { first: 'Test', last: 'Carer' }, active: true },
            { name: { first: 'Test2', last: 'Carer2' }, active: true }
        ]
        selectedUser = 'TestId'

        wrapper = shallow(
            <LmcTeamScreen 
                users={users}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('renders an LmcSidebar with the correct props', () => {
        const sidebar = wrapper.find('LmcSidebar')
        expect(sidebar.props().items).toEqual(users)
        expect(sidebar.props().selectedItem).toEqual(selectedUser)
        expect(sidebar.props().setSelectedItem).toEqual(setSelectedUser)
    })
})