import React from 'react'
import { shallow } from 'enzyme'
import { LmcOrganisationScreen } from '../index.jsx'

describe('LmcOrganisationScreen', () => {
    let wrapper
    let children
    let tabs

    beforeEach(() => {
        children = <div className='testClass'>Test</div>
        tabs = 

        wrapper = shallow(
            <LmcOrganisationScreen 
                children={children}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('renders an LmcTabBar', () => {
        expect(wrapper.find('Connect(LmcTabBar)').length).toEqual(1)
    })

    it('renders its children', () => {
        const childDiv = wrapper.find('.testClass')
        expect(childDiv.props().children).toEqual('Test')
    })
})