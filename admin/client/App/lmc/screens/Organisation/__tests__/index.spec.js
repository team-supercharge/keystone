import React from 'react'
import { shallow } from 'enzyme'
import { LmcOrganisationScreen } from '../index.jsx'

describe('LmcOrganisationScreen', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(
            <LmcOrganisationScreen />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })
})