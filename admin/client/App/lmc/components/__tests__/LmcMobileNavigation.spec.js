import React from 'react'
import { shallow } from 'enzyme'
import LmcMobileNavigation from '../navigation/LmcMobileNavigation.jsx'

jest.mock('react-device-detect', () => ({
    isBrowser: false,
    isTablet: false
}))

describe('LmcMobileNavigation', () => {
    let wrapper
    let sections

    beforeEach(() => {
        global.Keystone = { adminPath: '/admin' }
        sections = []
        wrapper = shallow(
            <LmcMobileNavigation
                sections={sections}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })
    
    it('renders an LmcMobileNavMenu when the button is clicked', () => {
        const button = wrapper.find('GlyphButton')
        expect(wrapper.find('LmcMobileNavMenu').length).toEqual(0)

        button.simulate('click')
        expect(wrapper.find('LmcMobileNavMenu').length).toEqual(1)
    })
})