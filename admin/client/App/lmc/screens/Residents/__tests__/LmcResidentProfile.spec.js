import React from 'react'
import { shallow } from 'enzyme'
import { LmcResidentProfile } from '../components/LmcResidentProfile.jsx'

describe('LmcResidentProfile', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(
            <LmcResidentProfile />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })
})