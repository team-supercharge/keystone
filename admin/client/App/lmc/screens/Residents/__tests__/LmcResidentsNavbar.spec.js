import React from 'react'
import { shallow } from 'enzyme'
import { LmcResidentsNavbar } from '../components/LmcResidentsNavbar.jsx'

describe('LmcResidentsNavbar', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(
            <LmcResidentsNavbar />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })
})