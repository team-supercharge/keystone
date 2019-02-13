import React from 'react'
import { shallow } from 'enzyme'
import { LmcResidentProfile } from '../components/LmcResidentProfile.jsx'
import { Link } from 'react-router'

describe('LmcResidentProfile', () => {
    let wrapper
    let selectedResident
    let savedKeystone

    beforeAll(() => {
        savedKeystone = global.Keystone
        global.Keystone = { adminPath: '/admin' }
    })

    beforeEach(() => {
        selectedResident = 'testId'
        wrapper = shallow(
            <LmcResidentProfile 
                selectedResident={selectedResident}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('has a link to edit the selected resident profile', () => {
        const editLink= wrapper.find(Link).first()
        expect(editLink.text()).toEqual('Edit Information')
        expect(editLink.props().to).toEqual(`/admin/residents/${selectedResident}`)
    })

    afterAll(() => {
        global.Keystone = savedKeystone
    })
})