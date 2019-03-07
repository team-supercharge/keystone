import React from 'react'
import { shallow } from 'enzyme'
import { LmcResidentProfile } from '../components/LmcResidentProfile.jsx'
import { Link } from 'react-router'
import MockDate from 'mockdate'

MockDate.set('1/1/2019')

describe('LmcResidentProfile', () => {
    let wrapper
    let selectedResident
    let profile

    beforeAll(() => {
        global.Keystone = { adminPath: '/admin' }
    })

    beforeEach(() => {
        selectedResident = 'testId'
        profile = {
            name: { first: 'Test', last: 'Resident' },
            preferredName: 'Testy',
            location: { room: '12' },
            status: 'active',
            dateOfBirth: new Date(1900, 2, 1)
        }
        wrapper = shallow(
            <LmcResidentProfile 
                selectedResident={selectedResident}
                profile={profile}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('has a link to edit the selected resident profile', () => {
        const button = wrapper.find('GlyphButton')
        expect(button.props().children).toEqual('Edit')
        expect(button.props().to).toEqual(`/admin/residents/${selectedResident}`)
    })

    it('renders the resident name in its first span', () => {
        const name = wrapper.find('span').first()
        expect(name.text()).toEqual('Test Resident')
    })

    it('renders the resident age and birthday', () => {
        const birthdayAndAge = '1st March 1900 (118)'
        expect(wrapper.text().includes(birthdayAndAge)).toBe(true)
    })

    it('renders the resident preferred name', () => {
        const preferredNameText = `Preferred name: ${profile.preferredName}`
        expect(wrapper.text().includes(preferredNameText)).toBe(true)
    })

    it('renders the resident room number', () => {
        const roomNumberText = `ROOM${profile.location.room}`
        expect(wrapper.text().includes(roomNumberText)).toBe(true)
    })
})