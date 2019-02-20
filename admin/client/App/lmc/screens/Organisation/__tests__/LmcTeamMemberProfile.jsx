import React from 'react'
import { shallow } from 'enzyme'
import { LmcTeamMemberProfile } from '../components/LmcTeamMemberProfile.jsx'

describe('LmcTeamMemberProfile', () => {
    let wrapper
    let selectedUser
    let selectedUserProfile

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
})