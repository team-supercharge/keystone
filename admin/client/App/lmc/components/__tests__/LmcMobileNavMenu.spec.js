import React from 'react'
import { shallow } from 'enzyme'
import LmcMobileNavMenu from '../navigation/LmcMobileNavMenu.jsx'

describe('LmcMobileNavMenu', () => {
    let wrapper 
    let sections

    beforeEach(() => {
        sections = []
        wrapper = shallow(
            <LmcMobileNavMenu
                sections={sections}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })
})