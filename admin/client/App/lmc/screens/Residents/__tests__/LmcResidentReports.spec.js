import React from 'react'
import { shallow } from 'enzyme'
import { LmcResidentReports } from '../components/LmcResidentReports.jsx'

describe('LmcResidentReports', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(
            <LmcResidentReports  />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })
})