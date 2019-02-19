import React from 'react'
import { shallow } from 'enzyme'
import { LmcPasswordsScreen } from '../components/LmcPasswordsScreen.jsx'

describe('LmcPasswordsScreen', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(
            <LmcPasswordsScreen />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })
})