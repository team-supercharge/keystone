import React from 'react'
import { shallow } from 'enzyme'
import LmcBirthdaysCard from '../components/LmcBirthdaysCard'

describe('LmcBirthdaysCard', () => {
    let wrapper
    let residents
    let mockDate

    beforeEach(() => {
        mockDate = new Date('01-07-1940')
        residents = [
            {
                dateOfBirth: mockDate
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
})