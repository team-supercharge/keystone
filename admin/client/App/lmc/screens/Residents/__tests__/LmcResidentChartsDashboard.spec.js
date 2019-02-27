import React from 'react'
import { shallow } from 'enzyme'
import { LmcResidentChartsDashboard } from '../components/LmcResidentChartsDashboard.jsx'


describe('LmcResidentChartsDashboard', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(
            <LmcResidentChartsDashboard />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })
})