import React from 'react'
import { shallow } from 'enzyme'
import LmcResidentsCard from '../components/LmcResidentsCard'

describe('LmcResidentsCard', () => {
    let wrapper
    let savedKeystone
    let residents

    beforeAll(() => {
        savedKeystone = global.Keystone
        global.Keystone = { adminPath: 'TestPath' }
    })

    beforeEach(() => {
        residents = [
            {
                name: 'TestName',
                id: 1,
                status: 'active'
            }
        ]
        wrapper = shallow(
            <LmcResidentsCard
                onCreate={() => {}}
                residents={residents}
            />
        )
    })

    test('should render correct snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('should have a link to the correct resident profile', () => {
        const profileLink = wrapper.find('LmcProfileLink')
        expect(profileLink.props().name).toEqual('TestName')
        expect(profileLink.props().to).toEqual('TestPath/residents/1')
    })

    afterAll(() => {
        global.Keystone = savedKeystone
    })
})