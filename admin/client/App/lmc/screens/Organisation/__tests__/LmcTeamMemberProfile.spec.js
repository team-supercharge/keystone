import React from 'react'
import { shallow } from 'enzyme'
import { LmcTeamMemberProfile } from '../components/LmcTeamMemberProfile.jsx'

describe('LmcTeamMemberProfile', () => {
    let wrapper
    let selectedUser
    let selectedUserProfile

    beforeAll(() => {
        global.Keystone = { adminPath: '/admin' }
    })

    beforeEach(() => {
        selectedUser = 'TestId'
        selectedUserProfile = {
            name: { first: 'Test', last: 'TeamMember' },
            email: 'TestEmail',
            id: selectedUser,
            active: true,
            picture: 'TestPictureUrl',
        }
        wrapper = shallow(
            <LmcTeamMemberProfile
                selectedUser={selectedUser}
                profile={selectedUserProfile}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('renders a button to edit the team member information', () => {
        const button = wrapper.find('GlyphButton')
        expect(button.props().children).toEqual('Edit')
        expect(button.props().to).toEqual(`${Keystone.adminPath}/users/${selectedUser}`)
    })
})