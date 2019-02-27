import React from 'react'
import { shallow } from 'enzyme'
import LmcMobileNavMenu from '../navigation/LmcMobileNavMenu.jsx'

describe('LmcMobileNavMenu', () => {
    let wrapper 
    let sections
    let location

    beforeEach(() => {
        sections = []
        location = {}
        
        wrapper = shallow(
            <LmcMobileNavMenu
                sections={sections}
                location={location}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })
})