import React from 'react'
import { shallow } from 'enzyme'
import { LmcTeamMemberProfile } from '../components/LmcTeamMemberProfile.jsx'

describe('LmcTeamMemberProfile', () => {
    let wrapper
    let selectedUser
    let selectedUserProfile
    let savedKeystone

    beforeAll(() => {
        savedKeystone = global.Keystone
        global.Keystone = { adminPath: '/admin' }
    })

    beforeEach(() => {
        selectedUser = 'TestId'
        selectedUserProfile = {
            name: { first: 'Test', last: 'TeamMember' },
            id: selectedUser,
            active: true,
            picture: 'TestPictureUrl',
        }
        wrapper = shallow(
            <LmcTeamMemberProfile
                selectedUser={selectedUser}
                selectedUserProfile={selectedUserProfile}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('renders a link to edit the team member information', () => {
        const link = wrapper.find('Link')
        expect(link.props().children).toEqual('Edit Information')
        expect(link.props().to).toEqual(`${Keystone.adminPath}/users/${selectedUser}`)
    })

    afterAll(() => {
        global.Keystone = savedKeystone
    })
})