import React from 'react'
import { shallow } from 'enzyme'
import LmcResidentChart from '../components/LmcResidentChart.jsx'

describe('LmcResidentChart', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(
            <LmcResidentChart />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })
})