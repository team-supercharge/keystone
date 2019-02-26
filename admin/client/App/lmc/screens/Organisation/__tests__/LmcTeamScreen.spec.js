jest.mock('../../../../shared/CreateForm')

import React from 'react'
import { shallow } from 'enzyme'
import { LmcTeamScreen } from '../components/LmcTeamScreen.jsx'

describe('LmcTeamScreen', () => {
    let wrapper
    let users
    let selectedUser
    const setSelectedUser = jest.fn()
    const fetchUsers = jest.fn()

    beforeEach(() => {
        users = [
            { name: { first: 'Test', last: 'Carer' }, active: true },
            { name: { first: 'Test2', last: 'Carer2' }, active: true }
        ]
        selectedUser = 'TestId'

        wrapper = shallow(
            <LmcTeamScreen
                fetchUsers={fetchUsers}
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

    it('renders a spinner if no data is loaded', () => {
        const emptyWrapper = shallow(
            <LmcTeamScreen 
                fetchUsers={fetchUsers}
                users={null}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
            />
        )
        expect(wrapper.find('LmcSpinner').length).toEqual(0)
        expect(emptyWrapper.find('LmcSpinner').length).toEqual(1)
    })

    it('renders a message if there are no team members yet, else renders profile', () => {
        const emptyWrapper = shallow(
            <LmcTeamScreen
                fetchUsers={fetchUsers}
                users={[]}
                selectedUser={null}
                setSelectedUser={setSelectedUser}
            />
        )

        expect(wrapper.find('BlankState').length).toEqual(0)
        expect(wrapper.find('Connect(LmcTeamMemberProfile)').length).toEqual(1)

        const message = emptyWrapper.find('BlankState')
        expect(message.props().heading).toEqual("You haven't added any team members yet")
        expect(emptyWrapper.find('LmcTeamMemberProfile').length).toEqual(0)
    })
})