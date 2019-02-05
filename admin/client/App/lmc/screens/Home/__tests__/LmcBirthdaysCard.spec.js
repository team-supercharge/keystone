import React from 'react'
import { shallow } from 'enzyme'
import LmcBirthdaysCard from '../components/LmcBirthdaysCard'
import MockDate from 'mockdate'

MockDate.set('1/1/2019')

describe('LmcBirthdaysCard', () => {
    let wrapper
    let residents
    let birthday

    beforeEach(() => {
        birthday = new Date('01-07-1940')
        residents = [
            {
                id: 1,
                dateOfBirth: birthday
            }
        ]
        wrapper = shallow((
            <LmcBirthdaysCard
                residents={residents}
            />
        ))
    })

    test('should render correct snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('should display correct upcoming birthday', () => {
        const birthdayAlert = wrapper.find('LmcResidentListItem')
        expect(birthdayAlert.props().data.name).toEqual('79 years old on Monday 7th Jan')
    })

    afterAll(() => {
        MockDate.reset()
    })
})