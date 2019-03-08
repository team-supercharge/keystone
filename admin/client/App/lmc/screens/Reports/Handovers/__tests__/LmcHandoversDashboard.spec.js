import React from 'react'
import { shallow } from 'enzyme'
import { LmcHandoversDashboard } from '../LmcHandoversDashboard.jsx'

describe('LmcHandoversDashboard', () => {
    let wrapper
    global.Keystone = { 
        adminPath: '/admin', 
        user: { features: { handovers: true } } 
    }

    beforeEach(() => {
        wrapper = shallow(
            <LmcHandoversDashboard />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })
})