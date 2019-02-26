import React from 'react'
import { shallow } from 'enzyme'
import { LmcResidentCharts } from '../components/LmcResidentCharts.jsx'

describe('LmcResidentCharts', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(
            <LmcResidentCharts />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })
})