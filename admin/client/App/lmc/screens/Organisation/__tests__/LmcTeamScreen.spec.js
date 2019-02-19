jest.mock('../../../../shared/CreateForm')

import React from 'react'
import { shallow } from 'enzyme'
import { LmcTeamScreen } from '../components/LmcTeamScreen.jsx'

describe('LmcTeamScreen', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(
            <LmcTeamScreen />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('renders an LmcSidebar', () => {
        expect(wrapper.find('LmcSidebar').length).toEqual(1)
    })
})