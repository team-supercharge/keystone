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
})