import React from 'react'
import { shallow } from 'enzyme'
import { LmcResidentDocuments } from '../components/LmcResidentDocuments.jsx'

describe('LmcResidentDocuments', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(
            <LmcResidentDocuments />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })
})